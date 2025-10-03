import { useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText(""); // clear input after adding
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your goal..."
        onChangeText={goalInputHandler}
        value={enteredGoalText}
      />
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.pressedButton,
        ]}
        onPress={addGoalHandler}
      >
        <Text style={styles.buttonText}>Add Goal</Text>
      </Pressable>
    </View>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  addButton: {
    backgroundColor: "#5e0acc",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  pressedButton: {
    backgroundColor: "#7d40e7",
    opacity: 0.8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
