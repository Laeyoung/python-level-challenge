import React from 'react';
import _ from 'underscore';
import styled from 'styled-components';
import { Helmet } from "react-helmet";
import resultList from '../../static/json/resultList';
import ShareLink from '../ui/ShareLink';
import Answers from '../ui/Answers';
import GradationButton from '../ui/button/GradationButton.js';
import GradationText from '../ui/text/GradationText.js';
import Footer from '../ui/Footer';

const base64url = require('base64-url');

const Image = styled.img`
    @media (min-width: 1000px) {
        height: 500px;
        width: 500px;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    @media (max-width: 1000px) {
        height: 50vh;
        width: 50vh;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;     
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    animation: fadein 2s;
    -moz-animation: fadein 2s;
    -webkit-animation: fadein 2s; 
    -o-animation: fadein 2s;

    @keyframes fadein {
        from {
            opacity:0;
        }
        to {
            opacity:1;
        }
    }
    @-moz-keyframes fadein { 
        from {
            opacity:0;
        }
        to {
            opacity:1;
        }
    }
    @-webkit-keyframes fadein { 
        from {
            opacity:0;
        }
        to {
            opacity:1;
        }
    }
    @-o-keyframes fadein { 
        from {
            opacity:0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Description = styled.div`
    font-size: 0.5rem;
    width: 90%;
    text-align: center;
`;

const ScoreText = styled.div`
    color: grey;
    font-size: 5px;
    margin: 5px;
`;

const LevelText = styled.div`
    margin-top: 5%;
    font-size: 8px
`;

class Result extends React.Component {
    constructor() {
        super();

        this.state = {
            title: `Python Quiz Flex`,
            description: "Let's take a look Python quiz and show off your score.",
            imgsrc: "",
        };
    }

    decodeAnswer(encoded) {
        const decodedString = base64url.decode(encoded);
        try {
            return JSON.parse(decodedString);
        } catch (e) {
            return null;
        }
    }

    render() {
        const answers = this.decodeAnswer(new URLSearchParams(this.props.location.search).get("answers"))
        const result = _.sample(resultList[answers.score || 0])

        return (
            <Wrapper>
                <Helmet>
                    <title>{`${title}`}</title>
                    <meta name="description" content={`${description}`} />
                    <meta name="keywords" content={`ainize,python,programming languages,quiz`} />
                    {/* Open Graph metadata */}
                    <meta property="og:title" content={`${title}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:description" content={`${description}`} />
                    <meta property="og:image" content={require(`../../static/img/result/level_${level}.png`)} />
                </Helmet>

                <LevelText>
                    Your level is
                </LevelText>

                <GradationText fontSize={1.5} fontWeight={"bold"}>
                    {result.Name}
                </GradationText >

                Top {result.Top}%

                <ScoreText>
                    Score: {answers.score || 0} / {answers.length}
                </ScoreText>

                <Image src={require(`../../static/img/result/level_${answers.score||1}.png`)}/>

                <Description>
                    {result.Description}
                </Description>

                <GradationText fontSize={0.7}>
                    Flex your level
                </GradationText>

                <ShareLink />

                <GradationButton color="white" onClick={()=>window.location.href = '/'}>
                    Start a new quiz
                </GradationButton>

                <GradationButton color="white" onClick={()=>window.location.href = '/'}>
                    Discuss the quiz with others
                </GradationButton>

                {/* TODO should fix default array for debugging([1,2]) */}
                <Answers answerSheet={answers}/>

                <Footer/>
            </Wrapper>
        )
    };
}

export default Result;
