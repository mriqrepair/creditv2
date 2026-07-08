import type { Client, Dispute, NegativeItem } from "./types";

type LetterContext = {
  client: Pick<
    Client,
    | "first_name"
    | "last_name"
    | "email"
    | "address_line1"
    | "address_line2"
    | "city"
    | "state"
    | "zip"
  >;
  negativeItem: Pick<
    NegativeItem,
    "creditor_name" | "account_number" | "bureau" | "item_type"
  >;
  dispute: Pick<Dispute, "round_number" | "reason">;
  today: string;
};

function clientAddress(client: LetterContext["client"]) {
  const lines = [
    client.address_line1,
    client.address_line2,
    [client.city, client.state, client.zip].filter(Boolean).join(", "),
  ].filter(Boolean);
  return lines.join("\n");
}

export function generateLetterContent(
  templateType: string,
  context: LetterContext
): string {
  const { client, negativeItem, dispute, today } = context;
  const fullName = `${client.first_name} ${client.last_name}`;
  const address = clientAddress(client);
  const accountRef = negativeItem.account_number
    ? `Account #${negativeItem.account_number}`
    : "the referenced account";

  const templates: Record<string, string> = {
    initial_dispute: `${today}

${fullName}
${address}
${client.email}

To Whom It May Concern:

I am writing to dispute inaccurate information on my credit report regarding ${negativeItem.creditor_name}, ${accountRef}, reported to ${negativeItem.bureau}.

Reason for dispute: ${dispute.reason || "This account contains inaccurate and unverifiable information that must be investigated and corrected or deleted under the Fair Credit Reporting Act."}

Please conduct a reasonable investigation and provide written results. If the information cannot be verified, please delete it from my credit file immediately.

Sincerely,
${fullName}`,

    method_of_verification: `${today}

${fullName}
${address}

Re: Method of Verification Request — ${negativeItem.creditor_name} (${negativeItem.bureau})

This is a follow-up to my prior dispute (Round ${dispute.round_number}). The disputed item was verified, and I am requesting the method of verification used, including the name and contact information of the furnisher and copies of any documents relied upon.

Please respond within 15 days as required by the FCRA.

Sincerely,
${fullName}`,

    escalation: `${today}

${fullName}
${address}

Re: Escalation — Unresolved Dispute — ${negativeItem.creditor_name}

I previously disputed the above account without satisfactory resolution. This letter serves as formal escalation (Round ${dispute.round_number}).

${dispute.reason || "The reporting remains inaccurate and must be corrected or deleted."}

I expect compliance with FCRA dispute obligations.

Sincerely,
${fullName}`,

    goodwill: `${today}

${fullName}
${address}

Dear ${negativeItem.creditor_name},

I am respectfully requesting a goodwill adjustment regarding ${accountRef}. I have taken steps to improve my financial situation and would appreciate your consideration in removing or updating this negative entry.

Thank you for your time and consideration.

Sincerely,
${fullName}`,
  };

  return (
    templates[templateType] ??
    templates.initial_dispute.replace(
      "I am writing to dispute",
      `Per template "${templateType}", I am writing to dispute`
    )
  );
}
