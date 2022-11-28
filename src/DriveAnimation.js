import { StyleSheet, Dimensions, Pressable } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

const Text_Drive = ["D", "r", "i", "v", "e"];

const driveAnimation = ({ Colors }) => {
  const xAxisTranslateValue = Text_Drive.map(() => useSharedValue(0));

  const skewXTranslateValue = Text_Drive.map(() => useSharedValue(0));

  const viewMotionValue = useSharedValue(20);

  const pressableTranslateValue = useSharedValue(0);

  const Action = () => {
    pressableTranslateValue.value = withRepeat(
      withTiming(-5, { duration: 300 }, () => {
        pressableTranslateValue.value = withTiming(0, { duration: 300 });
      }),
      -1,
      true
    );

    for (let i = 0; i < Text_Drive.length; i++) {
      xAxisTranslateValue[i].value = withDelay(
        i * 10,
        withDelay(
          250,
          withRepeat(
            withTiming(60, { duration: 1100 }, () => {
              xAxisTranslateValue[i].value = -40;
              xAxisTranslateValue[i].value = withTiming(0);
            }),
            -1,
            true
          )
        )
      );
    }

    for (let i = 0; i < Text_Drive.length; i++) {
      skewXTranslateValue[i].value = withDelay(
        i * 25,
        withRepeat(
          withTiming(25, { duration: 900 }, () => {
            skewXTranslateValue[i].value = withTiming(0, { duration: 500 });
          }),
          -1,
          true
        )
      );
    }

    viewMotionValue.value = withDelay(
      400,
      withRepeat(
        withTiming(260, { duration: 750 }, () => {
          viewMotionValue.value = 20;
        }),
        -1,
        true
      )
    );
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

  const motionStyle = useAnimatedStyle(() => {
    return {
      left: viewMotionValue.value,
      opacity: viewMotionValue.value != 20 ? 1 : 0,
    };
  });

  const textTranslateStyle = Text_Drive.map((t, i) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: xAxisTranslateValue[i].value,
          },
          { skewX: ` ${skewXTranslateValue[i].value}deg` },
        ],
        opacity: interpolate(
          xAxisTranslateValue[i].value,
          [-35, 0, 35],
          [0.1, 1, 0]
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
        { backgroundColor: Colors.white, shadowColor: Colors.white },
      ]}
    >
      <Animated.View style={styles.driveCont}>
        {Text_Drive.map((text, i) => (
          <Animated.Text
            key={i}
            style={[styles.text, textTranslateStyle[i], { color: Colors.sky }]}
          >
            {text}
          </Animated.Text>
        ))}
        <Animated.View style={[styles.fakeView, motionStyle]} />
      </Animated.View>
    </AnimatedButton>
  );
};

export default driveAnimation;

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
  driveCont: {
    flexDirection: "row",
    width: width / 2.5,
    height: height / 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    overflow: "hidden",
  },
  fakeView: {
    backgroundColor: "white",
    transform: [{ skewX: "45deg" }],
    width: 25,
    height: height / 23,
    position: "absolute",
    left: 0,
  },
  text: {
    zIndex: -1,
    fontSize: width / 20,
    fontWeight: "500",
    margin: 0.5,
  },
});
