"use client";
import { Affix, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function GoBackButton({}: Props) {
  const router = useRouter();
  return (
    <Affix position={{ bottom: 25, left: 10 }}>
      <Button onClick={() => router.back()} leftSection={<IconArrowLeft />}>
        Go Back
      </Button>
    </Affix>
  );
}

export default GoBackButton;
