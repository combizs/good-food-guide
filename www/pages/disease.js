import Layout from "../components/layout/Layout";
import Grid from "@material-ui/core/Grid";
import FoodList from "../components/food/FoodList";
import Image from "../components/disease/ImageContainer";
import Breadcrumb from "../components/layout/Breadcrumb";
import { getDisease } from "../modules/api";
import Error404 from "../components/Error/Error404";
import {
  BackButton,
  StyledParagraph,
  StyledParagraphTitle,
  PageSection,
  StyledPageTitle
} from "../components/layout/Commons";
import PropTypes from "prop-types";

const DiseaseDetails = props => {
  if (props.disease.length <= 0) {
    return <Error404 />;
  }
  let data = props.disease[0];
  return (
    <Layout>
      <Grid container>
        <PageSection>
          <Breadcrumb />
        </PageSection>

        <Grid
          item
          xs={12}
          md={5}
          lg={5}
          align="center"
          style={{ paddingTop: "23px" }}
        >
          <Image src={data.image} alt={data.searchKey} />
        </Grid>

        <Grid item xs={12} md={6} lg={6} style={{ padding: "15px" }}>
          <StyledPageTitle align="left">{data.name}</StyledPageTitle>
          <StyledParagraph>{data.description}</StyledParagraph>

          <br />
          <StyledParagraphTitle>Symptomps</StyledParagraphTitle>
          {data.symptoms.map((symptomps, index) => (
            <Symptomps key={index} symptomps={symptomps} />
          ))}

          <br />
          <StyledParagraphTitle>Good Foods</StyledParagraphTitle>
          <GoodFoods goodFoods={data.goodFoods} />
        </Grid>

        <PageSection>
          <BackButton href="/" />
        </PageSection>
      </Grid>
    </Layout>
  );
};

DiseaseDetails.propTypes = {
  disease: PropTypes.object.isRequired
};

DiseaseDetails.getInitialProps = async function(context) {
  const { disease } = context.query;
  let data = await getDisease(disease);
  return { disease: data };
};

const Symptomps = props => {
  const { symptomps } = props;
  return (
    <React.Fragment>
      <StyledParagraph>{symptomps.description}</StyledParagraph>
      <StyledParagraph>
        <ul>
          {symptomps.symptoms.map((symptom, index) => (
            <li key={index} style={{ marginLeft: "10px" }}>
              {symptom}
            </li>
          ))}
        </ul>
      </StyledParagraph>
    </React.Fragment>
  );
};

Symptomps.propTypes = {
  symptomps: PropTypes.object.isRequired
};

const GoodFoods = props => {
  const { goodFoods } = props;
  return (
    <React.Fragment>
      <GoodFoodList title="Veg Foods:" foods={{ vegan: goodFoods.vegan }} />
      <GoodFoodList
        title="Non veg Foods:"
        foods={{ nonVegan: goodFoods.nonVegan }}
      />
    </React.Fragment>
  );
};

GoodFoods.propTypes = { goodFoods: PropTypes.object.isRequired };

const GoodFoodList = props => {
  const { title, foods } = props;
  return (
    <React.Fragment>
      {foods[Object.keys(foods)].length > 0 && (
        <StyledParagraph>{title}</StyledParagraph>
      )}
      <FoodList goodFoods={foods} />
    </React.Fragment>
  );
};

GoodFoodList.propTypes = {
  title: PropTypes.string.isRequired,
  foods: PropTypes.object.isRequired
};

export default DiseaseDetails;
