import { Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import TextInput from "./TextInput";
import { ReviewValues } from "../../types";
import theme from "../theme";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useState } from "react";
import { ApolloError } from "@apollo/client";
import { useNavigate } from "react-router-native";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
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
    marginHorizontal: 40,
  },
  textCenteredItem: {
    alignSelf: "center",
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(0, "Rating must be greater than or equal to 0")
    .max(100, "Rating must be less than or equal to 100")
    .required("Rating is required"),
  text: yup.string(),
});

interface reviewFormProps {
  onSubmit: (values: ReviewValues) => void;
  error: string;
}

interface reviewContainerProps {
  onSubmit: (values: ReviewValues) => Promise<void>;
  error: string;
}

const ReviewForm = ({ onSubmit, error }: reviewFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.flexContainer}>
      <TextInput
        error={
          formik.touched.ownerName && formik.errors.ownerName ? true : false
        }
        options={{
          placeholder: "Repository owner name",
          value: formik.values.ownerName,
          onChangeText: formik.handleChange("ownerName"),
        }}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.textErrorItem}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        error={
          formik.touched.repositoryName && formik.errors.repositoryName
            ? true
            : false
        }
        options={{
          placeholder: "Repository name",
          value: formik.values.repositoryName,
          onChangeText: formik.handleChange("repositoryName"),
        }}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.textErrorItem}>{formik.errors.repositoryName}</Text>
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
        error={formik.touched.text && formik.errors.text ? true : false}
        options={{
          placeholder: "Review",
          value: formik.values.text,
          onChangeText: formik.handleChange("text"),
          multiline: true,
        }}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.textErrorItem}>{formik.errors.text}</Text>
      )}
      <Pressable
        onPress={() => formik.handleSubmit()}
        style={styles.textBlueBoxItem}
      >
        <Text color="white" style={styles.textCenteredItem}>
          Create a review
        </Text>
      </Pressable>
      {error && <Text style={styles.textErrorItem}>{error}</Text>}
    </View>
  );
};

export const ReviewContainer = ({ onSubmit, error }: reviewContainerProps) => {
  return <ReviewForm onSubmit={onSubmit} error={error} />;
};

const Review = () => {
  const [createReview] = useCreateReview();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (values: ReviewValues) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      if (e instanceof ApolloError && typeof e.message === "string") {
        setError(e.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} error={error} />;
};

export default Review;
