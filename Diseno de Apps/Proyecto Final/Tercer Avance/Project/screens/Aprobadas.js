/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const AprobadasScreen = ({ navigation }) => {
  const [solicitudesAprobadas, setSolicitudesAprobadas] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    obtenerSolicitudesAprobadas();
  }, []);

  const obtenerSolicitudesAprobadas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/aprobadas", {
        timeout: 5000,
      });
      setSolicitudesAprobadas(response.data);
    } catch (error) {
      console.error("Error al obtener las solicitudes aprobadas:", error);
    }
  };

  const mostrarDetalles = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes Aprobadas</Text>
      {solicitudesAprobadas.map((solicitud, index) => (
        <Card key={solicitud.idSolicitud} containerStyle={styles.card}>
          <TouchableOpacity
            onPress={() => mostrarDetalles(solicitud)}
            onPressIn={() => setSelectedRow(index)}
            onPressOut={() => setSelectedRow(null)}
            activeOpacity={0.8}
            style={[styles.row, selectedRow === index && styles.selectedRow]}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                ID Solicitud: {solicitud.idSolicitud}
              </Text>
              <Text style={styles.cardText}>
                Fecha Solicitud: {solicitud.fechaSolicitud}
              </Text>
              <Text style={styles.cardText}>
                Justificación: {solicitud.justificacion}
              </Text>
            </View>
            <Ionicons name='arrow-forward' size={24} color='black' />
          </TouchableOpacity>
        </Card>
      ))}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Detalles de la Solicitud</Text>
          {selectedSolicitud && (
            <View>
              <Text>ID Solicitud: {selectedSolicitud.idSolicitud}</Text>
              <Text>Fecha Solicitud: {selectedSolicitud.fechaSolicitud}</Text>
              <Text>Estado Solicitud: {selectedSolicitud.estadoSolicitud}</Text>
              <Text>Justificación: {selectedSolicitud.justificacion}</Text>
              <Text>Comentario: {selectedSolicitud.comentario}</Text>
              <Text>Cantidad: {selectedSolicitud.cantidad}</Text>
              <Text>Nombre Usuario: {selectedSolicitud.nombreUsuario}</Text>
              <Text>Nombre Producto: {selectedSolicitud.nombreProducto}</Text>
              <Text>Prioridad: {selectedSolicitud.prioridad}</Text>
              <Text>Estado Entrega: {selectedSolicitud.estadoEntrega}</Text>
              {/* Agrega más detalles aquí según la estructura de tu objeto de solicitud */}
            </View>
          )}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.openButton}>
            <Text style={styles.textStyle}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Ionicons name='arrow-back' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedRow: {
    backgroundColor: "#e0e0e0",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 16,
    color: "#666",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    elevation: 4,
  },
});

export default AprobadasScreen;
