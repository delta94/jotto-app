import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { t } from '../helpers/strings';
import languageContext from '../contexts/languageContext'
import guessedWordsContext from '../contexts/guessedWordsContext'
import getLetterMatchCount from '../utils/LetterMatch';
import successContext from '../contexts/successContext';

const InputStyled = styled.input`
    height: 28px;
    font-size: 1em;
    border: 1px solid #000;
    border-radius: 4px;
`

const ButtonStyled = styled.button`
    height: 28px;
    border: 1px solid #000;
    font-size: 1em;
    border-radius: 4px;
    margin-left: 4px;
    color: #fff;
    background-color: #000;
    padding: 0 10px;
`

export const InputBox = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = useState('')
  const language = useContext(languageContext)
  const [success, setSuccess] = successContext.useSuccess()
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords()

  if (success) {
    return null
  }

  return (
    <form test-id="input-box">
      <InputStyled
        autoFocus
        test-id="input"
        placeholder={t(language, 'guessInputPlaceholder')}
        value={currentGuess}
        onChange={(event) => setCurrentGuess(event.target.value)}
      />
      <ButtonStyled
        test-id="submit-button"
        onClick={(event) => {
          // Update guessedWords
          const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
          const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount }];
          setGuessedWords(newGuessedWords);

          // Check secretWord match with guess and update success
          if (currentGuess === secretWord) {
            setSuccess(true);
          }
          event.preventDefault()
          setCurrentGuess('')
        }
        }
      >
        {t(language, 'submit')}
      </ButtonStyled>
    </form>
  )
}

InputBox.propTypes = {
  secretWord: PropTypes.string.isRequired
}