import React, { useState } from "react";
import SurveyQuestion from "./SurveyQuestion";
import {
  careerInterests,
  classOptions,
  mandatoryClasses,
  SurveyAnswers,
} from "./surveyData";
import "./index.css";

const SurveyForm: React.FC = () => {
  const [formData, setFormData] = useState<SurveyAnswers>({
    year: "",
    careerInterests: [],
    priorExperience: "",
    courseName: "",
    enjoyment: 3,
    lectureQuality: 3,
    supportAvailability: 3,
    careerRelevance: 3,
    workload: "",
    expectedGrade: "",
    advice: "",
    extraNotes: "",
    topClasses: [{ className: "", rating: null }],
    mandatoryClasses: mandatoryClasses.map(name => ({
      className: name,
      rating: null,
      expectation: undefined,
      enjoyment: undefined,
      gpa: null,
      lectureQuality: null,
      support: null,
      careerRelevance: null,
      priorExperience: null,
    })),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddElective = () => {
    if (formData.topClasses.length < 5) {
      setFormData(prev => ({
        ...prev,
        topClasses: [...prev.topClasses, { className: "", rating: null }],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filledElectives = formData.topClasses.filter(cls => cls.className && cls.rating !== null);
    if (filledElectives.length < 5) {
      alert("Please add and rate at least 5 senior electives.");
      return;
    }
    fetch('https://honors-xuw5.onrender.com/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(err => console.error(err));
  };

  return (
    <div className="survey-container">
      <form onSubmit={handleSubmit} className="survey-form">
        <h1 className="survey-heading">Course Survey</h1>

        <div className="survey-group">
          <SurveyQuestion label="What year are you in? (Enter as a number: 1 = Freshman, 4 = Senior)">
            <input
              type="number"
              name="year"
              min="1"
              max="5"
              value={formData.year}
              onChange={handleChange}
              className="survey-input"
            />
          </SurveyQuestion>
        </div>

        <div className="survey-group">
          <SurveyQuestion label="Career Interest Area:">
            <select
              value={formData.careerInterests[0] ?? ""}
              onChange={(e) => {
                setFormData({ ...formData, careerInterests: [e.target.value] });
              }}
              className="survey-input"
            >
              <option value="">Select a field</option>
              {careerInterests.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </SurveyQuestion>
        </div>

        <div className="survey-group">
          <SurveyQuestion label="Rate Required CS Courses (0 = Not Taken)">
            <div className="survey-classes">
              {formData.mandatoryClasses.map((cls, idx) => (
                <div key={cls.className} className="survey-class-box spaced-box">
                  <label className="survey-subheading">{cls.className}</label>
                  <input
                    type="number"
                    name={`mandatory-${idx}`}
                    value={cls.rating ?? ""}
                    onChange={(e) => {
                      const updated = [...formData.mandatoryClasses];
                      const value = e.target.value === "" ? null : Number(e.target.value);
                      updated[idx].rating = value;
                      if (value !== null && value === 0) {
                        updated[idx].expectation = 1;
                        updated[idx].gpa = null;
                        updated[idx].lectureQuality = null;
                        updated[idx].support = null;
                        updated[idx].careerRelevance = null;
                        updated[idx].priorExperience = null;
                      } else if (value !== null && value > 0) {
                        updated[idx].expectation = undefined;
                      }
                      setFormData({ ...formData, mandatoryClasses: updated });
                    }}
                    min={0}
                    max={5}
                    className="survey-input"
                  />

                  {cls.rating === 0 && (
                    <>
                      <label className="survey-subheading">Expectation for the class(1–5)</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={cls.expectation ?? ""}
                        onChange={(e) => {
                          const updated = [...formData.mandatoryClasses];
                          updated[idx].expectation = Number(e.target.value);
                          setFormData({ ...formData, mandatoryClasses: updated });
                        }}
                        className="survey-input"
                      />
                    </>
                  )}

                  {cls.rating !== null && cls.rating > 0 && (
                    <>
                      <label className="survey-subheading">Prior Coding Experience (Before Class was taken if applicable)</label>
                      <select
                        value={cls.priorExperience ?? ""}
                        onChange={(e) => {
                          const updated = [...formData.mandatoryClasses];
                          updated[idx].priorExperience = e.target.value;
                          setFormData({ ...formData, mandatoryClasses: updated });
                        }}
                        className="survey-input"
                      >
                        <option value="">Select Experience Level</option>
                        <option value="None">None</option>
                        <option value="Some">Some</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Extensive">Extensive</option>
                      </select>

                      <label className="survey-subheading">GPA (0–4)</label>
                      <input
                        type="number"
                        step={0.01}
                        min={0}
                        max={4}
                        value={cls.gpa ?? ""}
                        onChange={(e) => {
                          const updated = [...formData.mandatoryClasses];
                          updated[idx].gpa = e.target.value === "" ? null : Number(e.target.value);
                          setFormData({ ...formData, mandatoryClasses: updated });
                        }}
                        className="survey-input"
                      />
                      <label className="survey-subheading">Lecture Quality (1–5)</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={cls.lectureQuality ?? ""}
                        onChange={(e) => {
                          const updated = [...formData.mandatoryClasses];
                          updated[idx].lectureQuality = e.target.value === "" ? null : Number(e.target.value);
                          setFormData({ ...formData, mandatoryClasses: updated });
                        }}
                        className="survey-input"
                      />
                      <label className="survey-subheading">Support From TAs and Professor(1–5)</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={cls.support ?? ""}
                        onChange={(e) => {
                          const updated = [...formData.mandatoryClasses];
                          updated[idx].support = e.target.value === "" ? null : Number(e.target.value);
                          setFormData({ ...formData, mandatoryClasses: updated });
                        }}
                        className="survey-input"
                      />
                      <label className="survey-subheading">Career Relevance (1–5)</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={cls.careerRelevance ?? ""}
                        onChange={(e) => {
                          const updated = [...formData.mandatoryClasses];
                          updated[idx].careerRelevance = e.target.value === "" ? null : Number(e.target.value);
                          setFormData({ ...formData, mandatoryClasses: updated });
                        }}
                        className="survey-input"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </SurveyQuestion>
        </div>

        <div className="survey-group">
          <SurveyQuestion label="Select and Rate Your Top 5 Electives (0 = Not Taken, 1–5 = Experience)">
          <p className="survey-instruction">For this portion of the survey are a list of senior electives that you may or may have not taken. If you have taken 5 or More classes, then please rate your top 5 on a scale from 1-5.
          If you select 0 then that means that you haven't taken the class but you are interested in it.</p>

            {formData.topClasses.map((cls, idx) => (
              <div key={idx} className="survey-class-box">
                <select
                  value={cls.className}
                  onChange={(e) => {
                    const updated = [...formData.topClasses];
                    updated[idx].className = e.target.value;
                    setFormData({ ...formData, topClasses: updated });
                  }}
                  className="survey-input mb-2"
                >
                  <option value="">Select Class</option>
                  {classOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0}
                  max={5}
                  value={cls.rating ?? ""}
                  onChange={(e) => {
                    const updated = [...formData.topClasses];
                    updated[idx].rating = e.target.value === "" ? null : Number(e.target.value);
                    setFormData({ ...formData, topClasses: updated });
                  }}
                  className="survey-input"
                  placeholder="Rate 0–5"
                />
              </div>
            ))}
            {formData.topClasses.length < 5 && (
              <button
                type="button"
                onClick={handleAddElective}
                className="survey-button mt-4"
              >
                Add Class
              </button>
            )}
          </SurveyQuestion>
        </div>

        <div className="extra-notes-box">
          <h2>Extra Notes</h2>
          <p>Please share any additional comments or feedback about the courses or program.</p>
        </div>

        <div className="survey-submit">
          <button type="submit" className="survey-button">
            Submit Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm;














