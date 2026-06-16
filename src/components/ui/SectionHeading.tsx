import FadeIn from "./FadeIn";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={`mb-14 flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <span className="section-label">{label}</span>
      <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p
          className={`text-gray-400 text-base sm:text-lg ${
            align === "center" ? "max-w-2xl" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
