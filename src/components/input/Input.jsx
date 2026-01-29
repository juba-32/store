import { TextField } from "@mui/material";

export default function Input({ type, id, label, value, onChange }) {
  return (
    <div>
      <TextField
        fullWidth
        required
        type={type}
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray", // default border
            },
            "&:hover fieldset": {
              borderColor: "gray", // keep same on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "gray", // same color
              borderWidth: 2, // bolder when focused
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "gray", // label color when focused
          },
        }}
      />
    </div>
  );
}
