import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

const MT = () => {
  return (
    <View style={styles.view}>
      <View style={[styles.frame, styles.frameLayout]}>
        <View style={[styles.animoji, styles.animojiLayout]}>
          <View style={styles.bgColor} />
          <Image
            style={styles.image4Icon}
            resizeMode="cover"
            source={require("../assets/image-4.png")}
          />
        </View>
        <Image
          style={[styles.curvedArrowLeft, styles.animojiLayout]}
          resizeMode="cover"
          source={require("../assets/curved--arrowleft.png")}
        />
        <View style={styles.frame1}>
          <Image
            style={styles.curvedBell}
            resizeMode="cover"
            source={require("../assets/curved--bell.png")}
          />
          <Text style={[styles.myTerms, styles.fall1Typo]}>My Terms</Text>
        </View>
      </View>
      <View style={[styles.frame2, styles.frameLayout]}>
        <View style={[styles.frame3, styles.framePosition]}>
          <View style={[styles.frameParent, styles.frameParentShadowBox]}>
            <View style={styles.curvedGrid4Parent}>
              <Image
                style={styles.curvedGrid4}
                resizeMode="cover"
                source={require("../assets/curved--grid4.png")}
              />
              <Text style={[styles.dashboard, styles.backFlexBox]}>
                Dashboard
              </Text>
            </View>
            <View style={[styles.curvedUser1Parent, styles.curvedParentLayout]}>
              <Image
                style={styles.curvedPosition}
                resizeMode="cover"
                source={require("../assets/curved--user1.png")}
              />
              <Text style={styles.profile}>Profile</Text>
            </View>
            <View
              style={[
                styles.curvedMessageSquareLinesParent,
                styles.curvedParentLayout,
              ]}
            >
              <Image
                style={[styles.curvedMessageSquareLines, styles.curvedPosition]}
                resizeMode="cover"
                source={require("../assets/curved--messagesquarelines.png")}
              />
              <Text style={styles.profile}>Chat</Text>
            </View>
          </View>
        </View>
        <View style={[styles.backWrapper, styles.frameParentShadowBox]}>
          <Text style={[styles.back, styles.backFlexBox]}>Back</Text>
        </View>
        <View style={styles.frame4}>
          <View style={[styles.fall1Parent, styles.parentShadowBox]}>
            <Text style={[styles.fall1, styles.fall1Typo]}>Fall 1</Text>
            <Image
              style={styles.curvedChevronCircleRight}
              resizeMode="cover"
              source={require("../assets/curved--chevroncircleright.png")}
            />
          </View>
          <View style={[styles.fall2Parent, styles.parentShadowBox]}>
            <Text style={[styles.fall1, styles.fall1Typo]}>Fall 2</Text>
            <Image
              style={styles.curvedChevronCircleRight}
              resizeMode="cover"
              source={require("../assets/curved--chevroncircleright.png")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    width: 375,
    overflow: "hidden",
  },
  animojiLayout: {
    height: 30,
    width: 30,
    top: 21,
    position: "absolute",
  },
  fall1Typo: {
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    lineHeight: 25,
    letterSpacing: 0,
    top: 1,
    position: "absolute",
    alignItems: "center",
  },
  framePosition: {
    left: 0,
    width: 375,
  },
  frameParentShadowBox: {
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: Color.colorGray_100,
    position: "absolute",
  },
  backFlexBox: {
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    lineHeight: 25,
    letterSpacing: 0,
    position: "absolute",
    alignItems: "center",
  },
  curvedParentLayout: {
    height: 50,
    width: 73,
    top: 7,
    position: "absolute",
  },
  curvedPosition: {
    left: 25,
    height: 24,
    width: 24,
    top: 0,
    position: "absolute",
  },
  parentShadowBox: {
    height: 43,
    borderWidth: 1,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    top: "50%",
    marginLeft: -159.5,
    width: 319,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: Color.colorGray_100,
    left: "50%",
    position: "absolute",
  },
  bgColor: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.purple,
    position: "absolute",
    overflow: "hidden",
    width: "100%",
  },
  image4Icon: {
    height: "102.33%",
    width: "102.33%",
    top: "5.67%",
    right: "-1%",
    bottom: "-8%",
    left: "-1.33%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  animoji: {
    left: 319,
    borderRadius: Border.br_31xl,
    overflow: "hidden",
  },
  curvedArrowLeft: {
    left: 21,
  },
  curvedBell: {
    left: 225,
    top: 0,
    height: 30,
    width: 30,
    position: "absolute",
  },
  myTerms: {
    marginLeft: -127.5,
    fontSize: 19,
    height: 27,
    color: Color.colorDarkslategray,
    textAlign: "left",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    lineHeight: 25,
    letterSpacing: 0,
    left: "50%",
    top: 1,
    width: 255,
  },
  frame1: {
    left: 61,
    width: 255,
    height: 30,
    top: 21,
    position: "absolute",
    overflow: "hidden",
  },
  frame: {
    overflow: "hidden",
    height: 65,
    backgroundColor: Color.background,
    width: 375,
  },
  curvedGrid4: {
    left: 36,
    height: 24,
    width: 24,
    top: 0,
    position: "absolute",
  },
  dashboard: {
    color: Color.lightPrimary,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    width: 96,
    left: 0,
    height: 30,
    top: 21,
  },
  curvedGrid4Parent: {
    left: 29,
    height: 51,
    width: 96,
    top: 7,
    position: "absolute",
  },
  profile: {
    top: 20,
    width: 73,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    left: 0,
    display: "flex",
    color: Color.colorDarkslategray,
    lineHeight: 25,
    letterSpacing: 0,
    height: 30,
    position: "absolute",
    alignItems: "center",
  },
  curvedUser1Parent: {
    left: 278,
  },
  curvedMessageSquareLines: {
    overflow: "hidden",
  },
  curvedMessageSquareLinesParent: {
    left: 159,
  },
  frameParent: {
    top: 525,
    borderTopLeftRadius: Border.br_5xs,
    borderTopRightRadius: Border.br_5xs,
    left: 0,
    width: 375,
    height: 65,
  },
  frame3: {
    height: 590,
    top: 127,
    position: "absolute",
    overflow: "hidden",
  },
  back: {
    marginLeft: -24.5,
    fontSize: 16,
    width: 49,
    height: 24,
    textAlign: "center",
    top: 7,
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    left: "50%",
  },
  backWrapper: {
    marginLeft: -51.5,
    width: 103,
    height: 38,
    top: 127,
    left: "50%",
    borderRadius: Border.br_31xl,
  },
  fall1: {
    left: 13,
    fontSize: FontSize.size_mini,
    width: 306,
    height: 42,
    color: Color.lightPrimary,
    textAlign: "left",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    lineHeight: 25,
    letterSpacing: 0,
    top: 1,
  },
  curvedChevronCircleRight: {
    marginLeft: 119.5,
    top: 8,
    width: 28,
    height: 28,
    left: "50%",
    position: "absolute",
  },
  fall1Parent: {
    marginTop: -48.5,
  },
  fall2Parent: {
    marginTop: 5.5,
  },
  frame4: {
    left: 28,
    height: 97,
    width: 319,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  frame2: {
    height: 717,
    marginTop: 30,
    overflow: "hidden",
  },
  view: {
    borderRadius: Border.br_5xs,
    flex: 1,
    height: 812,
    alignItems: "center",
    width: "100%",
    backgroundColor: Color.background,
  },
});

export default MT;
