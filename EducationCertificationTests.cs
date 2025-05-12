using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;

namespace MyNewWebApp.Tests
{
    [TestFixture]
    public class EducationCertificationTests
    {
        private IWebDriver driver;

        [SetUp]
        public void Setup()
        {
            var options = new ChromeOptions();
            options.AddArgument("--headless");
            options.AddArgument("--disable-gpu"); // Optional: Disable GPU hardware acceleration
            options.AddArgument("--window-size=1920,1080"); // Optional: Set window size

            // Initialize the WebDriver with the configured options
            driver = new ChromeDriver(@"C:\Path\To\ChromeDriver", options); // Update this path
            driver.Navigate().GoToUrl("http://localhost:5000/html/index.html"); // Update this path
        }

        [Test]
        public void EditEducationEntry()
        {
            // Locate the entry and click the edit button
            var editButton = driver.FindElement(By.CssSelector("#education-list li .edit-button"));
            editButton.Click();

            // Modify the form fields
            var institutionField = driver.FindElement(By.Name("institution"));
            institutionField.Clear();
            institutionField.SendKeys("Updated University");

            var degreeField = driver.FindElement(By.Name("degree"));
            degreeField.Clear();
            degreeField.SendKeys("Master of Science");

            var yearField = driver.FindElement(By.Name("year"));
            yearField.Clear();
            yearField.SendKeys("2024");

            // Submit the form
            driver.FindElement(By.CssSelector("#education-form button[type='submit']")).Click();

            // Verify the entry was updated
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector("#education-list li")));
            var entry = driver.FindElement(By.CssSelector("#education-list li"));
            Assert.IsTrue(entry.Text.Contains("Updated University"), "The education entry was not updated successfully.");
        }

        [Test]
        public void DeleteEducationEntry()
        {
            // Locate the entry and click the delete button
            var deleteButton = driver.FindElement(By.CssSelector("#education-list li .delete-button"));
            deleteButton.Click();

            // Confirm deletion if necessary (e.g., handle alert)
            driver.SwitchTo().Alert().Accept();

            // Verify the entry was deleted
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            bool entryExists = wait.Until(d => d.FindElements(By.CssSelector("#education-list li")).Count == 0);
            Assert.IsTrue(entryExists, "The education entry was not deleted successfully.");
        }

        [TearDown]
        public void Teardown()
        {
            driver.Quit();
        }
    }
}