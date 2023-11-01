"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button, Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogin2, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

type Props = {};

function Account({}: Props) {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const [opened, toggle] = useDisclosure(false);

  if (!isLoaded) return <Loader />;

  if (!isSignedIn)
    return (
      <Link href="/signup">
        <div className="flex flex-col items-center">
          <IconLogin2 />
          <div>Login</div>
        </div>
      </Link>
    );

  return (
    <div className="flex gap-2">
      <Link href="/user" className="flex flex-col items-center">
        <IconUser />
        <div>Account</div>
      </Link>
      {/* <div className="flex flex-col items-center" onClick={toggle.open}>
        <IconLogout2 />
        <div>Logout</div>
      </div> */}
      <div className="flex flex-col items-center justify-center">
        <UserButton
          appearance={{
            elements: {
              root: "flex flex-col items-center justify-center gap-2",
              avatar: "w-12 h-12",
            },
          }}
        />
      </div>
      <Modal
        centered
        variant="light"
        color="red"
        title="Are you sure you wish to logout?"
        opened={opened}
        onClose={toggle.close}
      >
        <div className="flex w-full items-center justify-evenly">
          <Button onClick={() => signOut()}>Yes</Button>
          <Button onClick={toggle.close}>No</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Account;
