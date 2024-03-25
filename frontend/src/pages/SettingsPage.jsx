import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Images } from "../components/Image";
import UpdateUsername from "../components/UpdateUsername";
import UpdatePassword from "../components/UpdatePassword";
import UpdateEmail from "../components/UpdateEmail";

function SettingsPage() {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const style = "flex justify-center items-center text-white";

  return (
    <div>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)} className={style}>
          Update Username
        </AccordionHeader>
        <AccordionBody>
          <UpdateUsername />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)} className={style}>
          Update Email
        </AccordionHeader>
        <AccordionBody>
          <UpdateEmail />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)} className={style}>
          Update Password
        </AccordionHeader>
        <AccordionBody>
          <UpdatePassword />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4}>
        <AccordionHeader className={style} onClick={() => handleOpen(4)}>
          Upload Photo
        </AccordionHeader>
        <AccordionBody>
          <Images />
        </AccordionBody>
      </Accordion>
    </div>
  );
}

export default SettingsPage;
