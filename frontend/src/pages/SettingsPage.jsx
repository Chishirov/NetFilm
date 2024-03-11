import { Button, Input, Card } from "@material-tailwind/react";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";


import { Images } from "../components/Image";
import UpdatePassword from "../components/UpdatePassword";

function SettingsPage() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Update Username
        </AccordionHeader>
        <AccordionBody>
          <div className="w-72 flex">
            <Input label="Username" />
            <Button>Update</Button>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Update Email
        </AccordionHeader>
        <AccordionBody>
          <div className="w-72 flex">
            <Input type="email" label="Email" />
            <Button>Update</Button>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Update Password
        </AccordionHeader>
        <AccordionBody>
          <UpdatePassword/>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4}>
        <AccordionHeader onClick={() => handleOpen(4)}>
          Upload Photo
        </AccordionHeader>
        <AccordionBody>
     
       <Images/>
        </AccordionBody>
      </Accordion>
     
    </div>
  );
}

export default SettingsPage;
