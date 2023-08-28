export const FormErrorMessage = ({
  errorMessage,
}: {
  errorMessage: string | undefined;
}) => {
  return <p className="text-xs text-red-600 my-1">{errorMessage}</p>;
};

export const FormDescription = ({
  description,
  color = "slate",
}: {
  description: string;
  color?: string;
}) => {
  return <p className={`text-xs text-${color}-500 my-1`}>{description}</p>;
};
