import { Typography } from "@/components/ui/typography";

interface ListHeaderProps extends React.PropsWithChildren {
  title: string;
}

export default function ListHeader({ title, children }: ListHeaderProps) {
  return (
    <header className="flex items-center justify-between ">
      <Typography variant={"headline"} as="h1">
        {title}
      </Typography>
      {children}
    </header>
  );
}