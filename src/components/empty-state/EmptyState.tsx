"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Container from "../ui/custom/Container";

interface EmptyStateProps {
  header?: string;
  subHeader?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ header, subHeader }) => {
  const router = useRouter();
  return (
    <Container>
      <div className="h-[50vh] flex flex-col justify-center items-center gap-3">
        {header && <h1 className="text-2xl text-purple-500">{header}</h1>}
        {subHeader && <h5 className="text-lg text-purple-500">{subHeader}</h5>}
        <Button onClick={() => router.refresh()}>Refresh Page</Button>
      </div>
    </Container>
  );
};

export default EmptyState;
