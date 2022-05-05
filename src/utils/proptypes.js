import PropTypes from 'prop-types'

export const svgShapeProps = PropTypes.shape({
  id: PropTypes.string,
  viewBox: PropTypes.string
})

export const choicesShape = PropTypes.shape({
  choice: PropTypes.string,
  votes: PropTypes.number
})

export const questionShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  question: PropTypes.string,
  imageUrl: PropTypes.string,
  thumbUrl: PropTypes.string,
  publishedAt: PropTypes.string,
  choices: PropTypes.arrayOf(choicesShape)
})
