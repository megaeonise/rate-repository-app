import { Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import TextInput from "./TextInput";
import { ReviewValues } from "../../types";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const initialValues = {
  repoOwnerName: "",
  repoName: "",
  rating: "",
  review: ""
};

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexGrow: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    backgroundColor: "white",
  },
  textBlueBoxItem: {
    padding: 10,
    borderColor: theme.colors.primary,
    borderRadius: 2,
    marginTop: 10,
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    width: 300,
    marginBottom: 10,
  },
  textErrorItem: {
    color: theme.colors.red,
    alignSelf: "flex-start",
    marginLeft: 40
  },
  textCenteredItem: {
    alignSelf: "center",
  },
});

const validationSchema = yup.object().shape({
  repoOwnerName: yup
    .string()
    .required("Repository owner name is required"),
  repoName: yup
    .string()
    .required("Repository name is required"),
  rating: yup.number().typeError("Rating must be a number").min(0, "Rating must be greater than or equal to 0").max(100, "Rating must be less than or equal to 100").required("Rating is required"),
  review: yup.string()
});

const ReviewForm = ({ onSubmit }: { onSubmit: (values: ReviewValues) => void }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <TextInput
        error={formik.touched.repoOwnerName && formik.errors.repoOwnerName ? true : false}
        options={{
          placeholder: "Repository owner name",
          value: formik.values.repoOwnerName,
          onChangeText: formik.handleChange("repoOwnerName"),
        }}
      />
      {formik.touched.repoOwnerName && formik.errors.repoOwnerName && (
        <Text style={styles.textErrorItem}>{formik.errors.repoOwnerName}</Text>
      )}
      <TextInput
        error={formik.touched.repoName && formik.errors.repoName ? true : false}
        options={{
          placeholder: "Repository name",
          value: formik.values.repoName,
          onChangeText: formik.handleChange("repoName"),
        }}
      />
      {formik.touched.repoName && formik.errors.repoName && (
        <Text style={styles.textErrorItem}>{formik.errors.repoName}</Text>
      )}
      <TextInput
        error={formik.touched.rating && formik.errors.rating ? true : false}
        options={{
          placeholder: "Rating between 0 and 100",
          value: formik.values.rating,
          onChangeText: formik.handleChange("rating"),
        }}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.textErrorItem}>{formik.errors.rating}</Text>
      )}
      <TextInput
        error={formik.touched.review && formik.errors.review ? true : false}
        options={{
          placeholder: "Review",
          value: formik.values.review,
          onChangeText: formik.handleChange("review"),
          multiline: true
        }}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={styles.textErrorItem}>{formik.errors.review}</Text>
      )}
      {/* @ts-ignore */}
      <Pressable onPress={formik.handleSubmit} style={styles.textBlueBoxItem}>
        <Text color="white" style={styles.textCenteredItem}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }: any) => {
  return <ReviewForm onSubmit={onSubmit} />;
};

const Review = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values: ReviewValues) => {
    const { repoOwnerName, repoName, rating, review } = values;
    try {
      //@ts-ignore
      await signIn({ repoOwnerName, repoName });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;
