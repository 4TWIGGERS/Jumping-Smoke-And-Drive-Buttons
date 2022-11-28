import { StyleSheet, Dimensions, Pressable, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

const { height, width } = Dimensions.get("screen");

const Text_Smoke = ["S", "m", "o", "k", "e"];

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

const smokeAnimation = ({ Colors }) => {
  const xAxisTranslateValue = Text_Smoke.map(() => useSharedValue(0));

  const yAxisTranslateValue = Text_Smoke.map(() => useSharedValue(0));

  const pressableTranslateValue = useSharedValue(0);

  const [blur, setBlur] = useState(0);

  const Action = () => {
    pressableTranslateValue.value = withRepeat(
      withTiming(-5, { duration: 300 }, () => {
        pressableTranslateValue.value = withTiming(0, { duration: 300 });
      }),
      -1,
      true
    );
    runOnJS(setBlur)(8);

    for (let i = 0; i < Text_Smoke.length; i++) {
      xAxisTranslateValue[i].value = withDelay(
        200,
        withDelay(
          i * 15,
          withRepeat(
            withTiming(190, { duration: 1300 }, () => {
              xAxisTranslateValue[i].value = -20;
              xAxisTranslateValue[i].value = withTiming(0);
              runOnJS(setBlur)(0);
            }),
            -1,
            true
          )
        )
      );
    }

    for (let i = 0; i < Text_Smoke.length; i++) {
      yAxisTranslateValue[i].value = withDelay(
        200,
        withDelay(
          i * 60,
          withRepeat(
            withTiming(-100, { duration: 1100 }, () => {
              yAxisTranslateValue[i].value = 0;
            }),
            -1,
            true
          )
        )
      );
    }
  };

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

  const textAnimatedStyle = Text_Smoke.map((t, i) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: xAxisTranslateValue[i].value,
          },
          {
            translateY: yAxisTranslateValue[i].value,
          },
        ],
        opacity: interpolate(
          xAxisTranslateValue[i].value,
          [-10, 0, 60],
          [0.5, 1, 0]
        ),
      };
    })
  );

  return (
    <AnimatedButton
      onPress={Action}
      style={[
        styles.pressable,
        pressableAnimatedStyle,
        { backgroundColor: Colors.dark, shadowColor: Colors.dark },
      ]}
    >
      <View intensity={3} style={styles.SmokeCont}>
        {Text_Smoke.map((text, i) => (
          <Animated.Text
            key={i}
            style={[styles.text, { color: Colors.white }, textAnimatedStyle[i]]}
          >
            {text}
          </Animated.Text>
        ))}
        <BlurView intensity={blur} tint="dark" style={[styles.blur]} />
      </View>
    </AnimatedButton>
  );
};

export default smokeAnimation;

const styles = StyleSheet.create({
  pressable: {
    width: width / 2.5,
    height: height / 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: 30,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowRadius: 5,
    elevation: 20,
  },
  SmokeCont: {
    flexDirection: "row",
    width: width / 2.5,
    height: height / 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    overflow: "hidden",
  },
  blur: {
    position: "absolute",
    borderRadius: 100,
    width: width / 2,
    height: height / 10,
  },
  text: {
    zIndex: -1,
    fontSize: width / 20,
    fontWeight: "500",
    margin: 0.5,
  },
});
