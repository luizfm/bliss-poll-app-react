import Swift from '_assets/lotties/swift-lottie.json'
import Ruby from '_assets/lotties/ruby-lottie.json'
import ObjectiveC from '_assets/lotties/objective-c-lottie.json'
import Python from '_assets/lotties/python-lottie.json'

export const LOTTIE_CONSTANTS = {
  SWIFT: Swift,
  RUBY: Ruby,
  OBJECTIVE_C: ObjectiveC,
  PYTHON: Python
}

export const formatKey = (key) => key.toUpperCase().replace(/-/g, '_')
