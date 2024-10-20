import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import photos from './photos';
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


// Smoke Test
it('renders Carousel without crashing', () => {
  render(<Carousel photos={photos} title="Test Carousel" />);
});

// Snapshot Test
it('matches snapshot', () => {
  const { asFragment } = render(<Carousel photos={photos} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
});


it('moves backward when clicking the left arrow', () => {
  const { getByText, getByRole } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Move forward to second image first
  const rightArrow = getByRole('button', { name: 'right-arrow' });
  fireEvent.click(rightArrow);

  // Test if clicking left arrow moves back to the first image
  const leftArrow = getByRole('button', { name: 'left-arrow' });
  fireEvent.click(leftArrow);

  // Check that the first image is displayed again
  expect(getByText('Photo 1 caption')).toBeInTheDocument();
});

it('hides the left arrow on the first image and the right arrow on the last image', () => {
  const { getByRole, queryByRole } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Initially, the left arrow should not be visible (we're on the first image)
  expect(queryByRole('button', { name: 'left-arrow' })).toBeNull();

  // Move forward to the last image
  const rightArrow = getByRole('button', { name: 'right-arrow' });
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Now, the right arrow should not be visible (we're on the last image)
  expect(queryByRole('button', { name: 'right-arrow' })).toBeNull();
});