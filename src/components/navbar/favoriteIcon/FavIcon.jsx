import { Badge, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function FavIcon() {
  const favoriteItems = useSelector((state) => state.cart?.favorites || []);

  return (
    <div>
      <Tooltip title="Favorites">
        <Link to="/favorites">
          <IconButton aria-label="favorites" sx={{ color: "cyan" }}>
            <Badge
              badgeContent={favoriteItems.length}
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
              <FavoriteIcon sx={{ fontSize: "1.3rem" }} />
            </Badge>
          </IconButton>
        </Link>
      </Tooltip>
    </div>
  );
}
