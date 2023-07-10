import { notFound } from "next/navigation";
import { FC } from "react";

const NotFoundCatchAll: FC = () => {
  notFound();
  return null;
};

export default NotFoundCatchAll;
