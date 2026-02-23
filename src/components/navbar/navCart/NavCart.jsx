import { Badge, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export default function NavCart() {
  const qty = useSelector((state) => state.cart.qty);

  return (
    <div>
      <Tooltip title="Cart">
        <Link to="/cart">
          <IconButton
            aria-label="cart"
            sx={{ color: "cyan"}}
          >
            <Badge
              badgeContent={qty}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "10px",
                  height: "16px",
                  minWidth: "16px",
                  padding: "0 4px",
                },
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: "1.3rem" }} />
            </Badge>
          </IconButton>
        </Link>
      </Tooltip>
    </div>
  );
}
