import { useEffect, useState } from "react"
import {styled } from "styled-components"
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import {mobile} from '../responsive'

const Quote = () => {

    const quotes = useSelector((state) => state.quotes.data)
    const [quoteIndex, setQuoteIndex] = useState(0)

    useEffect(() => {
        try {
            if (quotes.length > 0) {
                const quoteInterval = setInterval(() => {
                    const randomIndex = Math.floor(Math.random() * quotes.length)
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
                <QuoteFrame>
                    <QuoteContainer
                        key={quotes[quoteIndex]._id}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1}}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <QuoteContent>
                            {quotes[quoteIndex].content}
                        </QuoteContent>
                        <QuoteAuthor>
                            {quotes[quoteIndex].author}
                        </QuoteAuthor>
                    </QuoteContainer>
                </QuoteFrame>
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
    overflow: hidden;
    ${mobile({margin:'0.5rem 0',width:'calc(100% - 1rem)'})};
`

const QuoteFrame = styled.div`
    border: 1px solid  #F9B5D0;
    border-radius: 10px;
    height: 100%;
    width: 100%;
`

const QuoteContainer = styled(motion.div)`
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
    ${mobile({fontSize:'0.8rem'})};
`

const QuoteAuthor = styled.span`
    color: white;
    font-weight: 400;
    ${mobile({fontSize:'0.8rem'})};

    &::before{
        content: "***";
        margin-right: 10px;
    }
    &::after{
        content: "***";
        margin-left: 10px;
    }
`

