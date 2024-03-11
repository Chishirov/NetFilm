import { Typography, Avatar, Rating } from "@material-tailwind/react";

export function RatingWithComment() {
  return (
    <div
      className="py-8 text-center"
      style={{
        margin: "0 auto",
        width: "80%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        gap: "40px",
        borderBottom: "2px solid ",
      }}
    >
      <div>
        <Avatar
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image"
          size="lg"
        />
        <Typography variant="h6" className="mt-4">
          Tania Andrew
        </Typography>
        <Rating value={5} readonly />
      </div>
      <Typography variant="h5" color="blue-gray" className=" font-medium">
        &quot;This is an excellent product, the documentation is excellent and
        helped me get things done more efficiently.&quot;
      </Typography>
      {/*wenn admin ist && <button>admn</button> */}
    </div>
  );
}
