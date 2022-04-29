import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Container from "@mui/material/Container";

import { useAppSelector } from "app/hooks";
import { ElementsList } from "constants/index";
import useFetchCharactersList from "utils/useFetchCharactersList";

import { selectCharacterElementCount } from "redux/genshinCharacters/genshinCharactersSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPage = () => {
  useFetchCharactersList();
  const characterListStatus = useAppSelector(
    (state) => state.genshinCharacters.status
  );
  const characterElementCount = useAppSelector(selectCharacterElementCount);
  const isInit =
    characterListStatus === "idle" || characterListStatus === "loading";

  if (isInit) {
    return <div>Loading...</div>;
  }

  if (characterListStatus === "failed") {
    return <div>Error fetching data</div>;
  }
  const data = {
    labels: [...ElementsList],
    datasets: [
      {
        label: "Number of characters per element",
        data: characterElementCount,
        backgroundColor: [
          "rgb(133, 193, 171)",
          "rgb(171, 213, 227)",
          "rgb(171, 199, 76)",
          "rgb(172, 145, 192)",
          "rgb(237, 183, 70)",
          "rgb(108, 193, 238)",
          "rgb(225, 129, 65)",
        ],
      },
    ],
  };

  return (
    <Container
      sx={{
        display: "flex",
        width: { xs: "300px", sm: "500px", md: "600px", lg: "800px" },
        flexDirection: "column",
      }}
    >
      <div>Number of Characters per element</div>
      <br />
      <Pie
        data={data}
        options={{
          aspectRatio: 1,
        }}
      />
    </Container>
  );
};

export default ChartPage;
