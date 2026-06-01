import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
  TextField,
  IconButton
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ShoppingBag,
  LocationOn,
  Payment,
  Favorite,
  Person,
  ExitToApp,
  LockOpen,
  PersonAdd,
  CheckCircle,
  LocalShipping,
  Delete,
  Edit,
  Add
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUser, logoutUser } from "../utils/Helper"; 

export default function UserProfile() {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const user = getUser();
  
  // التحكم في التبويب النشط (Active Tab)
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    logoutUser();
    navigate("/register");
  };

  // ==================== بيانات محاكاة (Dummy Data) ====================
  const dummyOrders = [
    { id: "ORD-9872", date: "2026-05-28", total: "EGP 15,400", status: "Delivered", items: "iPhone 15 Pro Max" },
    { id: "ORD-1104", date: "2026-05-30", total: "EGP 3,200", status: "Shipped", items: "Anker Soundcore Headphones" },
  ];

  const dummyAddresses = [
    { id: 1, title: "المنزل", details: "١٢ شارع التحرير، الدقي، الجيزة، شقة ٤", phone: "01012345678", isDefault: true },
    { id: 2, title: "العمل", details: "مبنى القرية الذكية، طريق مصر إسكندرية الصحراوي، شركة التقنية", phone: "01198765432", isDefault: false }
  ];

  const dummyCards = [
    { id: 1, brand: "Visa", number: "**** **** **** 4242", expiry: "12/28" },
    { id: 2, brand: "MasterCard", number: "**** **** **** 5555", expiry: "08/27" }
  ];

  const dummyWishlist = [
    { id: 101, name: "شاشة سامسونج جيمنج Odyssey G5 27", price: "EGP 8,500", image: "https://via.placeholder.com/80" },
    { id: 102, name: "ماوس جلوريس موديل O لاسلكي", price: "EGP 2,100", image: "https://via.placeholder.com/80" }
  ];

  // ==================== 1️⃣ واجهة المستخدم غير المسجل ====================
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
        <Paper
          elevation={4}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(0, 255, 255, 0.03) 100%)`,
            border: "1px solid rgba(0, 255, 255, 0.1)"
          }}
        >
          <Avatar sx={{ bgcolor: "cyan", width: 70, height: 70, margin: "0 auto", mb: 3 }}>
            <ShoppingBag sx={{ fontSize: 40, color: "#111" }} />
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            مرحباً بك في متجرنا
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            سجّل دخولك الآن لتتمكن من تتبع طلباتك، إدارة عناوين الشحن، وحفظ منتجاتك المفضلة.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<LockOpen />}
              onClick={() => navigate("/register")}
              sx={{ bgcolor: "cyan", color: "#111", fontWeight: "bold", "&:hover": { bgcolor: "#00cccc" } }}
            >
              {t("signup.log in")}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PersonAdd />}
              onClick={() => navigate("/register")}
              sx={{ borderColor: "cyan", color: "cyan", "&:hover": { borderColor: "#00cccc" } }}
            >
              إنشاء حساب جديد
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // ==================== القائمة الجانبية (Sidebar) ====================
  const sidebarItems = [
    { id: "dashboard", text: "لوحة التحكم", icon: <DashboardIcon /> },
    { id: "orders", text: t("orders"), icon: <ShoppingBag /> },
    { id: "addresses", text: "عناوين الشحن", icon: <LocationOn /> },
    { id: "payments", text: "طرق الدفع والمنح", icon: <Payment /> },
    { id: "wishlist", text: "قائمة الأمنيات", icon: <Favorite /> },
    { id: "account", text: "تفاصيل الحساب", icon: <Person /> },
  ];

  // ==================== 2️⃣ واجهة المستخدم المسجل الكاملة ====================
  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Grid container spacing={4}>
        
        {/* العمود الأيمن: القائمة الجانبية ومعلومات المستخدم */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80, fontSize: "2rem", bgcolor: "cyan", color: "#111", fontWeight: "bold" }}>
                {user.fullname ? user.fullname[0].toUpperCase() : "U"}
              </Avatar>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                  {user.fullname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email || "user@example.com"}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <List component="nav">
              {sidebarItems.map((item) => (
                <ListItem
                  button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: activeTab === item.id ? "rgba(0, 255, 255, 0.08)" : "transparent",
                    color: activeTab === item.id ? "cyan" : "inherit",
                    "&:hover": { bgcolor: "rgba(0, 255, 255, 0.04)" }
                  }}
                >
                  <ListItemIcon sx={{ color: activeTab === item.id ? "cyan" : "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: activeTab === item.id ? "bold" : "regular" }} />
                </ListItem>
              ))}
              
              <Divider sx={{ my: 2 }} />
              
              <ListItem button onClick={handleLogout} sx={{ borderRadius: 2, color: theme.palette.error.main }}>
                <ListItemIcon sx={{ color: theme.palette.error.main }}>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary={t("logout")} primaryTypographyProps={{ fontWeight: "bold" }} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* العمود الأيسر: محتوى التبويب النشط المتغير ديناميكياً */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, minHeight: "550px" }}>
            
            {/* 1. تبويب: لوحة التحكم (Dashboard) */}
            {activeTab === "dashboard" && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>أهلاً بك، {user.fullname} 👋</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  من خلال لوحة التحكم الخاصة بك، يمكنك بسهولة استعراض طلباتك الأخيرة، وإدارة عناوين الشحن والدفع، وتعديل كلمة مرورك وتفاصيل حسابك.
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, borderColor: "rgba(255,255,255,0.1)" }}>
                      <Typography variant="subtitle2" color="text.secondary">الطلبات النشطة</Typography>
                      <Typography variant="h4" sx={{ fontWeight: "bold", my: 1, color: "cyan" }}>1</Typography>
                      <Typography variant="caption" color="text.secondary">جاري شحن طلبك الحالي المتوقع وصوله قريباً</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, borderColor: "rgba(255,255,255,0.1)" }}>
                      <Typography variant="subtitle2" color="text.secondary">رصيد المحفظة</Typography>
                      <Typography variant="h4" sx={{ fontWeight: "bold", my: 1, color: "lightgreen" }}>EGP 450</Typography>
                      <Typography variant="caption" color="text.secondary">يمكنك استخدام هذا الرصيد في مشترياتك القادمة</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* 2. تبويب: الطلبات (Orders) */}
            {activeTab === "orders" && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>تاريخ الطلبات</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {dummyOrders.map((order) => (
                    <Paper key={order.id} variant="outlined" sx={{ p: 3, borderRadius: 2, borderColor: "rgba(255,255,255,0.12)" }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                          <Typography variant="caption" color="text.secondary">رقم الطلب</Typography>
                          <Typography variant="body1" sx={{ fontWeight: "bold", color: "cyan" }}>{order.id}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="caption" color="text.secondary">التاريخ</Typography>
                          <Typography variant="body2">{order.date}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <Typography variant="caption" color="text.secondary">الإجمالي</Typography>
                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>{order.total}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{ textAlign: isMobile ? "left" : "right" }}>
                          <Chip
                            icon={order.status === "Delivered" ? <CheckCircle /> : <LocalShipping />}
                            label={order.status === "Delivered" ? "تم التوصيل" : "جاري الشحن"}
                            color={order.status === "Delivered" ? "success" : "warning"}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 2, borderStyle: "dashed" }} />
                      <Typography variant="body2" color="text.secondary">
                        <strong>المنتجات:</strong> {order.items}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {/* 3. تبويب: عناوين الشحن (Addresses) */}
            {activeTab === "addresses" && (
              <Box>
                <Box sx={{ display: "flex", justifyContent: "between", alignItems: "center", mb: 3, justifyItems: "space-between" }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1 }}>دفتر العناوين</Typography>
                  <Button variant="outlined" startIcon={<Add />} sx={{ color: "cyan", borderColor: "cyan" }}>إضافة عنوان</Button>
                </Box>
                <Grid container spacing={2}>
                  {dummyAddresses.map((addr) => (
                    <Grid item xs={12} sm={6} key={addr.id}>
                      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, borderColor: addr.isDefault ? "cyan" : "rgba(255,255,255,0.12)", relative: "true" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>{addr.title}</Typography>
                          {addr.isDefault && <Chip label="الافتراضي" size="small" sx={{ bgcolor: "cyan", color: "#111", fontWeight: "bold" }} />}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: "40px" }}>{addr.details}</Typography>
                        <Typography variant="caption" display="block" color="text.secondary">رقم الهاتف: {addr.phone}</Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                          <IconButton size="small" sx={{ color: "gray" }}><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* 4. تبويب: طرق الدفع (Payments) */}
            {activeTab === "payments" && (
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1 }}>البطاقات المحفوظة</Typography>
                  <Button variant="outlined" startIcon={<Add />} sx={{ color: "cyan", borderColor: "cyan" }}>إضافة بطاقة</Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {dummyCards.map((card) => (
                    <Paper key={card.id} variant="outlined" sx={{ p: 2.5, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderColor: "rgba(255,255,255,0.1)" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "rgba(255,255,255,0.05)", width: 50, height: 50, borderRadius: 1 }}>
                          <Payment sx={{ color: "cyan" }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: "bold" }}>{card.brand} - {card.number}</Typography>
                          <Typography variant="caption" color="text.secondary">تاريخ الانتهاء: {card.expiry}</Typography>
                        </Box>
                      </Box>
                      <IconButton color="error"><Delete /></IconButton>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {/* 5. تبويب: قائمة الأمنيات (Wishlist) */}
            {activeTab === "wishlist" && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>المنتجات المفضلة</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {dummyWishlist.map((item) => (
                    <Paper key={item.id} variant="outlined" sx={{ p: 2, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderColor: "rgba(255,255,255,0.1)" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box component="img" src={item.image} alt={item.name} sx={{ width: 60, height: 60, borderRadius: 1, bgcolor: "#333" }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: "bold" }}>{item.name}</Typography>
                          <Typography variant="body2" color="cyan" sx={{ fontWeight: "bold" }}>{item.price}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button variant="contained" size="small" sx={{ bgcolor: "cyan", color: "#111", fontWeight: "bold" }}>إضافة للسلة</Button>
                        <IconButton color="error"><Delete /></IconButton>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {/* 6. تبويب: تفاصيل الحساب (Account Details) */}
            {activeTab === "account" && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>تعديل بيانات الحساب</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="الاسم الكامل" defaultValue={user.fullname} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="البريد الإلكتروني" defaultValue={user.email || "user@example.com"} variant="outlined" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }}>تغيير كلمة المرور</Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth type="password" label="كلمة المرور الحالية" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth type="password" label="كلمة المرور الجديدة" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth type="password" label="تأكيد كلمة المرور الجديدة" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button variant="contained" size="large" sx={{ bgcolor: "cyan", color: "#111", fontWeight: "bold", "&:hover": { bgcolor: "#00cccc" } }}>
                      حفظ التغييرات
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}