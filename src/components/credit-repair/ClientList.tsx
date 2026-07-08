"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import type { Client } from "@/lib/credit-repair/types";
import { cn } from "@/lib/utils";

type Props = {
  clients: Client[];
  selectedId: string | null;
  onSelect: (client: Client) => void;
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-amber-100 text-amber-700",
  completed: "bg-slate-100 text-slate-700",
};

export function ClientList({ clients, selectedId, onSelect }: Props) {
  return (
    <Card title="Clients" description={`${clients.length} total clients`}>
      {clients.length === 0 ? (
        <p className="text-sm text-muted">No clients yet. Create one to get started.</p>
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>Name</TH>
              <TH>Email</TH>
              <TH>Status</TH>
              <TH>Created</TH>
            </TR>
          </THead>
          <TBody>
            {clients.map((client) => (
              <TR
                key={client.id}
                className={cn(
                  "cursor-pointer",
                  selectedId === client.id && "bg-orange/5"
                )}
                onClick={() => onSelect(client)}
              >
                <TD className="font-medium text-navy">
                  {client.first_name} {client.last_name}
                </TD>
                <TD>{client.email}</TD>
                <TD>
                  <Badge className={statusColors[client.status] ?? statusColors.active}>
                    {client.status}
                  </Badge>
                </TD>
                <TD className="text-muted">
                  {new Date(client.created_at).toLocaleDateString()}
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </Card>
  );
}
