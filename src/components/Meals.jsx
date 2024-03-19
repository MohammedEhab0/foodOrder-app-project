import MealItem from "./MealItem";
import useHttp from "../Hooks/useHttp";
import Error from "./Error";
const requestConfig = {};
export default function Meals() {
  const {
    data: loadedgMeals,
    isloading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isloading) {
    return <p className="center"> fetching is loading</p>;
  }
  if (error) {
    return <Error title="field to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedgMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
