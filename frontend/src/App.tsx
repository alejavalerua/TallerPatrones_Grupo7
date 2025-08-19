import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Avatar,
  Drawer,
  IconButton,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export const faqs = [
  { question: "¿Cuál es el horario de atención?", answer: "Nuestro equipo atiende de lunes a viernes de 8:00 AM a 6:00 PM y sábados de 9:00 AM a 2:00 PM." },
  { question: "¿Dónde están ubicados?", answer: "Nuestra oficina principal está en Calle 123 #45-67, Bogotá, Colombia, pero ofrecemos soporte en todo el país." },
  { question: "¿Ofrecen soporte remoto?", answer: "Sí, contamos con asistencia por videollamada, chat en línea y soporte vía correo electrónico." },
  { question: "¿Cómo puedo realizar una compra?", answer: "Selecciona el producto que desees, pulsa en 'Agregar al carrito' y sigue el proceso de pago desde la sección 'Mi Carrito'." },
  { question: "¿Qué métodos de pago aceptan?", answer: "Aceptamos tarjetas de crédito, débito, PSE, PayPal y pagos en efectivo en puntos autorizados." },
  { question: "¿Puedo pedir un reembolso?", answer: "Sí, puedes solicitar un reembolso dentro de los primeros 7 días tras la compra, siempre que el producto no haya sido utilizado." },
  { question: "¿Cómo puedo rastrear mi pedido?", answer: "En la sección 'Mis Compras', selecciona tu pedido y pulsa en 'Rastrear envío' para ver el estado en tiempo real." },
  { question: "¿Tienen promociones o descuentos?", answer: "Sí, publicamos promociones especiales cada mes y descuentos exclusivos para usuarios Premium." },
  { question: "¿Cómo me hago usuario Premium?", answer: "En el menú principal, selecciona 'Suscripciones' y elige el plan que más te convenga." },
  { question: "¿Cómo puedo cambiar mi método de pago?", answer: "Ve a 'Configuración de cuenta' → 'Métodos de pago' y añade o elimina tus tarjetas y cuentas asociadas." },
];

export default function ChatFAQ() {
  const [messages, setMessages] = useState([{ from: "bot", text: "Hola 👋, ¿en qué puedo ayudarte hoy?" }]);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const handleSelect = (faq: { question: string; answer: string }) => {
    setMessages((prev) => [...prev, { from: "user", text: faq.question }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: faq.answer }]);
    }, 1500);
  };

  return (
    <Box sx={{ background: "linear-gradient(135deg, #e0f7fa, #f3e5f5)", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md" sx={{ height: "100vh" }}>
        {/* Botones para abrir las barras */}
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <IconButton color="primary" onClick={() => setLeftOpen(true)}>
            <MenuIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setRightOpen(true)}>
            <ReportProblemIcon />
          </IconButton>
        </Stack>

        <Paper elevation={6} sx={{ p: 3, borderRadius: 3, display: "flex", flexDirection: "column", height: "80vh" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2, color: "primary.main" }}>
            Asistente Virtual
          </Typography>

          {/* Chat */}
          <Box sx={{ flex: 1, overflowY: "auto", mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            {messages.map((msg, i) => (
              <Stack key={i} direction={msg.from === "user" ? "row-reverse" : "row"} alignItems="flex-start" spacing={1}>
                <Avatar sx={{ bgcolor: msg.from === "user" ? "primary.main" : "secondary.main" }}>
                  {msg.from === "user" ? <PersonIcon /> : <SupportAgentIcon />}
                </Avatar>
                <Paper sx={{ p: 1.5, maxWidth: "75%", bgcolor: msg.from === "user" ? "primary.light" : "grey.100" }}>
                  <Typography variant="body1">{msg.text}</Typography>
                </Paper>
              </Stack>
            ))}
          </Box>

          {/* Botones FAQ */}
          <Stack spacing={1}>
            {faqs.map((faq, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleSelect(faq)}
                sx={{ justifyContent: "flex-start", textTransform: "none", borderRadius: 2 }}
              >
                {faq.question}
              </Button>
            ))}
          </Stack>
        </Paper>
      </Container>

      {/* Barra lateral izquierda: Contactos */}
      <Drawer anchor="left" open={leftOpen} onClose={() => setLeftOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Contactos</Typography>
          <List>
            <ListItem>
              <ListItemIcon><PhoneIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Teléfono" secondary="+57 123 456 789" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><WhatsAppIcon sx={{ color: "#25D366" }} /></ListItemIcon>
              <ListItemText primary="WhatsApp" secondary="+57 987 654 321" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><EmailIcon color="error" /></ListItemIcon>
              <ListItemText primary="Correo" secondary="soporte@empresa.com" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Barra lateral derecha: Abrir caso */}
      <Drawer anchor="right" open={rightOpen} onClose={() => setRightOpen(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Abrir Caso</Typography>
          <TextField label="Nombre" fullWidth sx={{ mb: 2 }} />
          <TextField label="Correo" type="email" fullWidth sx={{ mb: 2 }} />
          <TextField label="Descripción del problema" multiline rows={4} fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" fullWidth>Enviar</Button>
        </Box>
      </Drawer>
    </Box>
  );
}
