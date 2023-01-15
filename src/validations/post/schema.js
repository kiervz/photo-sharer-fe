import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const FILE_SIZE = 2_000_000;

export const schema = yup.object({
  description: yup.string().required('Please generate the cat fact.'),
  photo: yup.mixed().required('Please upload a photo.')
    .test('FILE_SIZE', 'File size is too large. (MAX. 2MB)', value => !value || (value && value.size <= FILE_SIZE))
    .test(
      'FILE_TYPE',
      'Invalid file format selection',
      (value) => value && SUPPORTED_FORMATS.includes(value?.type)
    ),
});