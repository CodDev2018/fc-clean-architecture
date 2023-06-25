import Address from "./address";

describe("Address unit tests", () => {
  it("should throw erro when street is empty", () => {
    expect(() => {
      new Address("", 123, "12345", "City");
    }).toThrowError("Street is required");
  });

  it("should throw erro when number is empty", () => {
    expect(() => {
      new Address("Street", 0, "12345", "City");
    }).toThrowError("Number is required");
  });

  it("should throw erro when zip is empty", () => {
    expect(() => {
      new Address("Street", 123, "", "City");
    }).toThrowError("Zip is required");
  });

  it("should throw erro when city is empty", () => {
    expect(() => {
      new Address("Street", 123, "12345", "");
    }).toThrowError("City is required");
  });

  it("should return address as string", () => {
    const address = new Address("Street", 123, "12345", "City");
    expect(address.toString()).toBe("Street, 123, 12345, City");
  });
});