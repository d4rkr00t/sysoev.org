import React from "react";
import { Link } from "gatsby";

export function GLink({ to, children }) {
  return <Link to={to}>{children}</Link>;
}
