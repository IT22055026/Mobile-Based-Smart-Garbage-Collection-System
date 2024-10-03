import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Assuming your Firebase config is correct
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

// Define the interface for a complaint
interface Complaint {
  complaintId: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  location: {
    latitude: number;
    longitude: number;
  };
  problem: string;
  date: string;
  time: string;
  status: string;
}

const ComplaintProcessing = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch processing complaints from Firestore
  const fetchProcessingComplaints = async () => {
    try {
      const complaintsCollection = collection(db, "complaints");
      const querySnapshot = await getDocs(complaintsCollection);

      const processingComplaints: Complaint[] = querySnapshot.docs
        .map((doc) => {
          const data = doc.data() as Omit<Complaint, 'complaintId'>;
          return {
            complaintId: doc.id,
            ...data,
          };
        })
        .filter((complaint) => complaint.status === "Processing");

      setComplaints(processingComplaints);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching processing complaints: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcessingComplaints();
  }, []);

  // Filter complaints based on search query
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.complaintId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render each complaint
  const renderComplaint = ({ item }: { item: Complaint }) => {
    return (
      <TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.title}>Complaint ID: {item.complaintId}</Text>
          <Text style={styles.text}>Problem: {item.problem}</Text>
          <Text style={styles.text}>Date: {item.date}</Text>
          <Text style={styles.text}>Time: {item.time}</Text>
          <Text style={styles.text}>Location: {`${item.location.latitude}, ${item.location.longitude}`}</Text>
          <Text style={styles.statusText}>Status: {item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading processing complaints...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Complaints</Text>
      </View>
      {/* Total Processing Complaints Count */}
      <View style={styles.complaintCountContainer}>
        <Icon name="list-alt" size={30} color="#4caf50" />
        <Text style={styles.complaintCountText}>Total Processing Complaints: {filteredComplaints.length}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Complaint ID"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredComplaints}
        renderItem={renderComplaint}
        keyExtractor={(item) => item.complaintId}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  headerTitle: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 3,
  },
  statusText: {
    fontSize: 16,
    color: "orange", // Adjust color for processing status
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  complaintCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  complaintCountText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#4caf50",
  },
});

export default ComplaintProcessing;
