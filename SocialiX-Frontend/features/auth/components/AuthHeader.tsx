import { LucideIcon } from "lucide-react";

interface AuthHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const  AuthHeader=({icon: Icon,title,description,}: AuthHeaderProps)=> {
  return (
    <div className="flex flex-col items-center mb-xl text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Icon size={30} className="text-primary" />
      </div>

      <h1 className="mb-2 text-3xl font-semibold text-on-surface">
        {title}
      </h1>

      <p className="text-sm text-on-surface-variant opacity-80">
        {description}
      </p>
    </div>
  );
}

export default AuthHeader