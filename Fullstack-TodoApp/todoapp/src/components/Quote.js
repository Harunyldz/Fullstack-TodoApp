import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { useSelector } from 'react-redux'

const Quote = () => {

    const quotes = useSelector((state) => state.quotes.data)
    const [quoteIndex, setQuoteIndex] = useState(0)

    useEffect(() => {
        try {
            if (quotes.length > 0) { 
                const quoteInterval = setInterval(() => {
                    const randomIndex=Math.floor(Math.random()*quotes.length)
                    setQuoteIndex(randomIndex)
                }, 10000)
                return () => clearInterval(quoteInterval)
            }

        } catch (error) {

        }
    }, [quotes])



    return (
        <MainDiv >
            {quotes.length > 0 && (
                <QuoteContainer>
                    <QuoteContent>{quotes[quoteIndex].content}</QuoteContent>
                    <QuoteAuthor>{quotes[quoteIndex].author}</QuoteAuthor>
                </QuoteContainer>
            )
            }
        </MainDiv>
    )
}

export default Quote

const MainDiv = styled.div`
    width:90%;
    background-color:#FF597B;
    height: 15vh;
    padding: 1rem;
    margin: 1rem 0;
    font-family:'Montserrat', sans-serif;
    padding: 5px;
    border-radius: 10px;
`

const QuoteContainer = styled.div`
    border: 1px solid  #F9B5D0;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const QuoteContent = styled.p`
    text-align: center;
    font-size: 1rem;
    color: #EEEEEE;
    font-weight:500;
    height: 75%;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const QuoteAuthor = styled.span`
    color: white;
    font-weight: 400;

    &::before{
        content: "***";
        margin-right: 10px;
    }
    &::after{
        content: "***";
        margin-left: 10px;
    }
`