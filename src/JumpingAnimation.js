import React from "react";

import { StyleSheet, Dimensions, Pressable } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const Text_Jumping = ["J", "u", "m", "p", "i", "n", "g"];

const { height, width } = Dimensions.get("screen");

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

const jumpingAnimation = ({ Colors }) => {
  const yAxisTranslateValue = Text_Jumping.map(() => useSharedValue(0));

  const pressableTranslateValue = useSharedValue(0);

  const textTranslateStyle = Text_Jumping.map((text, i) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: yAxisTranslateValue[i].value,
          },
        ],
      };
    })
  );

  const pressableAnimatedStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity:
        pressableTranslateValue.value != 0 ? withTiming(0.5) : withTiming(0.1),
      transform: [
        {
          translateY: pressableTranslateValue.value,
        },
      ],
    };
  });

  const Action = () => {
    pressableTranslateValue.value = withRepeat(
      withTiming(-5, { duration: 300 }, () => {
        pressableTranslateValue.value = withTiming(0, { duration: 300 });
      }),
      -1,
      true
    );

    for (let i = 0; i < Text_Jumping.length; i++) {
      yAxisTranslateValue[i].value = withDelay(
        i * 70,
        withTiming(-10, {}, () => {
          yAxisTranslateValue[i].value = withTiming(0);
        })
      );
    }
  };

  return (
    <AnimatedButton
      onPress={Action}
      style={[
        styles.pressable,
        pressableAnimatedStyle,
        { backgroundColor: Colors.sky, shadowColor: Colors.sky },
      ]}
    >
      <Animated.View style={styles.JumpingCont}>
        {Text_Jumping.map((text, i) => (
          <Animated.Text
            key={i}
            style={[
              styles.text,
              { color: Colors.white },
              textTranslateStyle[i],
            ]}
          >
            {text}
          </Animated.Text>
        ))}
      </Animated.View>
    </AnimatedButton>
  );
};

export default jumpingAnimation;

const styles = StyleSheet.create({
  pressable: {
    width: width / 2.5,
    height: height / 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowRadius: 5,
    elevation: 20,
  },
  text: {
    zIndex: -1,
    fontSize: width / 20,
    fontWeight: "500",
    margin: 0.5,
  },
  JumpingCont: {
    flexDirection: "row",
  },
});
