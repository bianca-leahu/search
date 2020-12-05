/**
 * Get list type
 * @param {Boolean} isCosts
 * @param {String} inputValue
 * @param {Array} costsList
 * @param {Array} statusList
 * @param {Array} statusListType
 * @param {Array} initialList
 * @returns {Array}
 */
export function getListType(
  isCosts,
  inputValue,
  costsList,
  statusList,
  statusListType,
  initialList
) {
  return (isCosts && !inputValue) ||
    inputValue === 'title' ||
    inputValue === 'date' ||
    inputValue === 'trainer' ||
    inputValue === 'venue' ||
    inputValue === 'learners' ||
    inputValue === 'created by' ||
    inputValue === 'created at'
    ? []
    : isCosts && inputValue
    ? costsList
    : inputValue === 'status'
    ? statusList
    : inputValue.includes('status ')
    ? statusListType
    : inputValue !== 'status'
    ? initialList.filter((a) => a.includes(inputValue))
    : initialList;
}

/**
 * Get initial list
 * @returns {Array}
 */
export function getInitialList() {
  return [
    'title',
    'date',
    'status',
    'trainer',
    'venue',
    'learners',
    'costs',
    'created by',
    'created at',
  ];
}

/**
 * Get status list
 * @returns {Array}
 */
export function getStatusList() {
  return ['= Equals', '≠ Equals'];
}

/**
 * Get status list type
 * @returns {Array}
 */
export function getStatusListType() {
  return ['Draft', 'In Progress', 'Ready', 'Completed'];
}

/**
 * Get costs list
 * @param {String} inputValue
 * @returns {Array}
 */
export function getCostsList(inputValue) {
  return [
    `= Equals to "${inputValue}"`,
    `≠ Not Equals to "${inputValue}"`,
    `> Greater than "${inputValue}"`,
    `≥ Greather or Equal to "${inputValue}"`,
    `< Less than "${inputValue}"`,
    `≤ Less or Equal to "${inputValue}"`,
  ];
}
