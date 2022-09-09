import React, { PropsWithChildren } from "react";

interface RequestProps {
  id: string;
}

const Request: React.FC<PropsWithChildren<RequestProps>> = ({
  id,
  children,
}) => <div id={id}>{children}</div>;

export default Request;
