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
  Tabs,
  Tab,
} from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

// FAQs
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

  // Roles: cliente/admin
  const [role, setRole] = useState<"cliente" | "admin">("cliente");

  // Tickets
  const [tickets, setTickets] = useState<any[]>([]);

  // Chat de ticket
  const [ticketChat, setTicketChat] = useState<{ step: number; data: any; msgs: any[] }>({
    step: 0,
    data: {},
    msgs: [{ from: "bot", text: "👋 Bienvenido al soporte. ¿Cuál es tu nombre?" }],
  });

  // Manejar selección de FAQ
  const handleSelect = (faq: { question: string; answer: string }) => {
    setMessages((prev) => [...prev, { from: "user", text: faq.question }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: faq.answer }]);
    }, 1000);
  };

  // Manejo de entrada en chat de ticket
const handleTicketResponse = (input: string) => {
  let { step, data, msgs } = ticketChat;

  // Guardamos el mensaje del usuario
  msgs = [...msgs, { from: "user", text: input }];
  let nextStep = step + 1;
  let newData = { ...data };

  if (step === 0) {
    // Guardamos el nombre
    newData.nombre = input;
    setTicketChat({ step: nextStep, data: newData, msgs });

    setTimeout(() => {
      setTicketChat((prev) => ({
        ...prev,
        msgs: [...prev.msgs, { from: "bot", text: "Gracias, ahora dime tu correo 📧" }]
      }));
    }, 1000);

  } else if (step === 1) {
    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      setTimeout(() => {
        setTicketChat((prev) => ({
          ...prev,
          msgs: [...prev.msgs, { from: "bot", text: "⚠️ Ese no parece un correo válido, inténtalo de nuevo." }]
        }));
      }, 500);
      return; // No avanzamos de step
    }

    newData.email = input;
    setTicketChat({ step: nextStep, data: newData, msgs });

    setTimeout(() => {
      setTicketChat((prev) => ({
        ...prev,
        msgs: [
          ...prev.msgs,
          { from: "bot", text: "¿Qué tipo de problema tienes? (Opciones: Técnico, Pago, Cuenta)" }
        ]
      }));
    }, 1000);

  } else if (step === 2) {
    // Solo permitir opciones válidas
    const opcionesValidas = ["técnico", "pago", "cuenta"];
    if (!opcionesValidas.includes(input.toLowerCase())) {
      setTimeout(() => {
        setTicketChat((prev) => ({
          ...prev,
          msgs: [
            ...prev.msgs,
            { from: "bot", text: "⚠️ Esa opción no es válida. Escribe: Técnico, Pago o Cuenta." }
          ]
        }));
      }, 500);
      return; // No avanzamos de step
    }

    newData.tipo = input;
    setTicketChat({ step: nextStep, data: newData, msgs });

    setTimeout(() => {
      setTicketChat((prev) => ({
        ...prev,
        msgs: [...prev.msgs, { from: "bot", text: "Por favor describe tu problema con más detalle 📝" }]
      }));
    }, 1000);

  } else if (step === 3) {
    // Guardamos la descripción
    newData.descripcion = input;
    setTicketChat({ step: nextStep, data: newData, msgs });

    setTimeout(() => {
      const ticketCompleto = { ...newData, estado: "pendiente", id: tickets.length + 1 };
      setTickets((prev) => [...prev, ticketCompleto]);

      setTicketChat((prev) => ({
        step: 0,
        data: {},
        msgs: [
          ...prev.msgs,
          { from: "bot", text: "✅ ¡Tu ticket fue creado! Nuestro equipo lo revisará pronto." },
          { from: "bot", text: "Si quieres, abre un nuevo ticket escribiendo tu nombre." }
        ]
      }));
    }, 1000);
  }
};

  return (
    <Box sx={{ background: "linear-gradient(135deg, #e0f7fa, #f3e5f5)", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md" sx={{ height: "100vh" }}>
        
        <Tabs value={role} onChange={(e, val) => setRole(val)} centered>
          <Tab label="Cliente" value="cliente" />
          <Tab label="Admin" value="admin" />
        </Tabs>

        {role === "cliente" && (
          <>
            {/* Botones */}
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <IconButton color="primary" onClick={() => setLeftOpen(true)}>
                <MenuIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => setRightOpen(true)}>
                <SupportAgentIcon />
              </IconButton>
            </Stack>

            {/* Chat principal */}
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, display: "flex", flexDirection: "column", height: "75vh" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2, color: "primary.main" }}>
                Asistente Virtual
              </Typography>

              <Box sx={{ flex: 1, overflowY: "auto", mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                {messages.map((msg, i) => (
                  <Stack key={i} direction={msg.from === "user" ? "row-reverse" : "row"} spacing={1}>
                    <Avatar sx={{ bgcolor: msg.from === "user" ? "primary.main" : "secondary.main" }}>
                      {msg.from === "user" ? <PersonIcon /> : <SupportAgentIcon />}
                    </Avatar>
                    <Paper sx={{ p: 1.5, maxWidth: "75%", bgcolor: msg.from === "user" ? "primary.light" : "grey.100" }}>
                      <Typography variant="body1">{msg.text}</Typography>
                    </Paper>
                  </Stack>
                ))}
              </Box>

              <Stack spacing={1}>
                {faqs.map((faq, index) => (
                  <Button key={index} variant="outlined" onClick={() => handleSelect(faq)} sx={{ justifyContent: "flex-start", textTransform: "none", borderRadius: 2 }}>
                    {faq.question}
                  </Button>
                ))}
              </Stack>
            </Paper>
          </>
        )}

        {/* Admin view */}
        {role === "admin" && (
          <Paper elevation={6} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>📋 Tickets recibidos</Typography>
            {tickets.length === 0 ? (
              <Typography>No hay tickets todavía.</Typography>
            ) : (
              tickets.map((t) => (
                <Paper key={t.id} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1"><b>#{t.id}</b> - {t.tipo}</Typography>
                  <Typography>👤 {t.nombre} | 📧 {t.email}</Typography>
                  <Typography>📝 {t.descripcion}</Typography>
                  <Typography color="warning.main">Estado: {t.estado}</Typography>
                </Paper>
              ))
            )}
          </Paper>
        )}
      </Container>

      {/* Drawer izquierda contactos */}
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

      {/* Drawer derecha ticket chat */}
      <Drawer anchor="right" open={rightOpen} onClose={() => setRightOpen(false)}>
        <Box sx={{ width: 300, p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Abrir Ticket</Typography>

          {/* Chat del ticket */}
          <Box sx={{ flex: 1, overflowY: "auto", mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            {ticketChat.msgs.map((msg, i) => (
              <Stack key={i} direction={msg.from === "user" ? "row-reverse" : "row"} spacing={1}>
                <Avatar sx={{ bgcolor: msg.from === "user" ? "primary.main" : "secondary.main" }}>
                  {msg.from === "user" ? <PersonIcon /> : <SupportAgentIcon />}
                </Avatar>
                <Paper sx={{ p: 1.5, maxWidth: "75%", bgcolor: msg.from === "user" ? "primary.light" : "grey.100" }}>
                  <Typography>{msg.text}</Typography>
                </Paper>
              </Stack>
            ))}
          </Box>

          {/* Entrada */}
          <TextField
            placeholder="Escribe tu respuesta..."
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim() !== "") {
                handleTicketResponse((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
        </Box>
      </Drawer>
    </Box>
  );
}