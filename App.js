import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, key: Math.random().toString() },
    ]);
  }

  return (
    <View style={styles.appContainer}>
      {/* Goal Input Section */}
      <GoalInput onAddGoal={addGoalHandler} />

      {/* Goal List Section */}
      <ScrollView style={styles.goalsContainer}>
        {courseGoals.map((goal) => (
          <GoalItem key={goal.key} text={goal.text} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
