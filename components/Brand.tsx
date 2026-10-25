import Image from "next/image";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="/" aria-label="RECONS home" className="inline-flex flex-col items-start gap-0.5">
      {inverse ? (
        <Image
          src="/images/recons-logo-dark.png"
          alt="RECONS"
          width={1080}
          height={279}
          priority
          className="h-8 w-auto sm:h-9"
        />
      ) : (
        <>
          <Image
            src="/images/recons-logo-light.png"
            alt="RECONS"
            width={1080}
            height={279}
            priority
            className="h-8 w-auto dark:hidden sm:h-9"
          />
          <Image
            src="/images/recons-logo-dark.png"
            alt="RECONS"
            width={1080}
            height={279}
            priority
            className="hidden h-8 w-auto dark:block sm:h-9"
          />
        </>
      )}
      <span className={`text-[8px] font-bold uppercase tracking-[0.2em] ${inverse ? "text-white/55" : "text-slate-500 dark:text-slate-400"}`}>
        Public Consultant
      </span>
    </a>
  );
}
