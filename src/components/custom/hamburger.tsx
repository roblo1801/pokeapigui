"use client";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";

function Hamburger() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden flex justify-center items-center mx-2 transition-opacity">
      {!open ? (
        <IconMenu2 size="2rem" onClick={() => setOpen(true)} />
      ) : (
        <IconX size="2rem" onClick={() => setOpen(false)} />
      )}
      {open ? (
        <div className="absolute top-20 z-10 mt-1 left-0 items-center bg-black/50 w-screen flex flex-col top-border">
          <p>Berries</p>
          <p>Pokemon</p>
        </div>
      ) : null}
    </div>
  );
}

export default Hamburger;
