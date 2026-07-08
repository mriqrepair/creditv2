import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-navy">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20",
          error && "border-red-400",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id ?? props.name;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-navy">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          "mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20",
          error && "border-red-400",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
};

export function Select({
  label,
  error,
  className,
  options,
  id,
  ...props
}: SelectProps) {
  const inputId = id ?? props.name;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-navy">
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          "mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20",
          error && "border-red-400",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
