import { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Box,
  Paper,
  Button,
  Skeleton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SinglePro({
  open,
  handleClose,
  productid,
  handleAddToCart,
}) {
  const theme = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productid) {
      setLoading(true);
      axios
        .get(`https://amb.up.railway.app/products/${productid}`)
        .then((res) => {
          setProduct(res.data);
        });
    }
    setLoading(false);
  }, [productid]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{ backdrop: { timeout: 400 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            p: { xs: 0, md: 2 },
          }}
        >
          <Paper
            sx={{
              width: { xs: "100vw", md: "85%" },
              height: { xs: "100vh", md: "85vh" },
              borderRadius: { xs: 0, md: 2 },
              p: { xs: 2, md: 3 },
              position: "relative",
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                minWidth: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "error.main",
                color: "white",
                zIndex: 10,
                "&:hover": { bgcolor: "error.dark", scale: 0.9 },
              }}
            >
              <CloseIcon />
            </Button>

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                <Skeleton variant="rectangular" width={250} height={250} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="70%" height={40} />
                  <Skeleton variant="text" width="50%" height={30} />
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="rectangular" width="100%" height={100} />
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Skeleton variant="rectangular" width={120} height={40} />
                    <Skeleton variant="rectangular" width={120} height={40} />
                  </Box>
                </Box>
              </Box>
            ) : (
              product && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    flex: 1,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "400px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        overflowY: "auto",
                        pr: 1,
                      }}
                    >
                      <h3>{product.title}</h3>
                      <p>
                        <strong>Brand</strong>: {product.brand}
                      </p>
                      <p>
                        <strong>Model</strong>: {product.model}
                      </p>
                      <p>
                        <strong>Color</strong>: {product.color}
                      </p>

                      <h4>About this product</h4>
                      <p>{product.description}</p>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        flexWrap: "wrap",
                        justifyContent: { xs: "center", md: "flex-start" },
                      }}
                    >
                      <Button
                        sx={{
                          backgroundColor: theme.palette.background.btnBG,
                          color: theme.palette.text.primary,
                          px: 3,
                          "&:hover": { scale: 0.95 },
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                      <Link to="/cart">
                        <Button
                          sx={{
                            backgroundColor: theme.palette.background.btnBGC,
                            color: theme.palette.text.primary,
                            px: 3,
                            transition: "background 0.3s ease-in-out",

                            "&:hover": { scale: 0.95 },
                          }}
                        >
                          Go to Cart
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              )
            )}
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
}
