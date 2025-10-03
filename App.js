import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Modal,
  Alert,
  Text,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    const newGoals = [
      ...courseGoals,
      { text: enteredGoalText, key: Math.random().toString() },
    ];
    setCourseGoals(newGoals);
    setIsModalVisible(false);

    // Show warning modal if goals exceed 5
    if (newGoals.length > 5) {
      setWarningModalVisible(true);
    }
  }

  function deleteGoalHandler(id) {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this goal?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setCourseGoals((currentGoals) =>
              currentGoals.filter((goal) => goal.key !== id)
            );
          },
        },
      ]
    );
  }

  function welcomePopupHandler() {
    Alert.alert("Welcome!", "Welcome to the Goal List application 🎉");
  }

  return (
    <View style={styles.appContainer}>
      {/* Header with User Icon */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Goals</Text>
        <Pressable onPress={welcomePopupHandler}>
          <MaterialIcons name="face" size={28} color="black" />
        </Pressable>
      </View>

      <Button title="Add New Goal" onPress={() => setIsModalVisible(true)} />

      {/* Add Goal Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <GoalInput
          onAddGoal={addGoalHandler}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>

      {/* Warning Modal if > 5 goals */}
      <Modal
        visible={warningModalVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setWarningModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 16, fontWeight: "bold" }}>
              ⚠️ Warning
            </Text>
            <Text style={{ marginBottom: 20 }}>
              You have added more than 5 goals. Don’t overwhelm yourself with
              too much burden!
            </Text>
            <Button title="OK" onPress={() => setWarningModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Goal List */}
      <FlatList
        data={courseGoals}
        renderItem={(itemData) => {
          return (
            <GoalItem
              text={itemData.item.text}
              id={itemData.item.key}
              onDeleteItem={deleteGoalHandler}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
