export const getResultMark = (sumPoints: number, marksAreas): string => {
  if (marksAreas) {
    if (sumPoints < marksAreas.three) {
      return 'неуд.';
    } else if (sumPoints > marksAreas.three && sumPoints < marksAreas.four) {
      return 'удовл.';
    } else if (sumPoints > marksAreas.four && sumPoints < marksAreas.five) {
      return 'хор.';
    } else if (sumPoints > marksAreas.five) {
      return 'отл.';
    }
  }
};

export const getSumMaxPoints = (
  jobs,
  countAsAverage,
  countWithAttendance,
  modules,
  maxAttendancePointsNumber,
): number => {
  let sumPoints = 0;
  jobs.forEach((job) => {
    sumPoints += job.maxPoint;
  });
  if (countAsAverage) {
    sumPoints = +(sumPoints / modules.length).toFixed(2);
  }
  if (countWithAttendance) {
    sumPoints += maxAttendancePointsNumber;
  }
  return sumPoints;
};

const getAttendancePoints = (attendance, attendanceWeight): number => {
  return attendance * attendanceWeight;
};

export const getSumPoints = (
  element,
  attendance: number,
  attendanceWeight,
  countAsAverage,
  countWithAttendance,
  modules,
): number => {
  let sumPoints = 0;
  let index = 0;
  let mark = element[index];
  while (mark !== undefined) {
    if (mark.id && !isNaN(+mark.markValue)) {
      sumPoints += +mark.markValue;
    }
    index++;
    mark = element[index];
  }
  if (countAsAverage) {
    sumPoints = +(sumPoints / modules.length).toFixed(2);
  }
  if (countWithAttendance && attendance) {
    sumPoints += getAttendancePoints(attendance, attendanceWeight);
  }
  return sumPoints;
};

const getResultCellMark = (
  element,
  attendance: number,
  attendanceWeight,
  countAsAverage,
  countWithAttendance,
  modules,
  marksAreas,
): string => {
  const sumPoints: number = getSumPoints(
    element,
    attendance,
    attendanceWeight,
    countAsAverage,
    countWithAttendance,
    modules,
  );
  return getResultMark(sumPoints, marksAreas);
};

export const parseGetMarksResult = ({
  students,
  jobs,
  modules,
  attendanceWeight,
  countAsAverage,
  countWithAttendance,
  marksAreas,
}) => {
  return students.map((student) => {
    const studentMarks = jobs.map((job) =>
      job.marks.find((mark) => mark.studentId === student.id),
    );

    const markObject = studentMarks.reduce((acc, mark) => {
      return {
        ...acc,
        [mark.jobId]: mark.markValue,
      };
    }, {});

    const attendancePoints = getAttendancePoints(
      student.attendance,
      attendanceWeight,
    );

    const sumPoints = getSumPoints(
      studentMarks,
      student.attendance,
      attendanceWeight,
      countAsAverage,
      countWithAttendance,
      modules,
    );

    const resultCellMark = getResultCellMark(
      studentMarks,
      student.attendance,
      attendanceWeight,
      countAsAverage,
      countWithAttendance,
      modules,
      marksAreas,
    );

    return {
      studentName: `${student.firstName} ${student.lastName}`,
      attendance: student.attendance,
      attendancePoints,
      sumPoints,
      resultCellMark,
      ...markObject,
    };
  });
};

export const orderedByModuleJobs = (modules, jobs) => {
  const orderedModules = [];
  const orderedJobs = [];
  let lastModuleInListNumber = 0;

  modules.forEach((module) => {
    if (module.numberInList > lastModuleInListNumber) {
      lastModuleInListNumber = module.numberInList;
    }
  });

  for (let i = 0; i <= lastModuleInListNumber; ++i) {
    const module = modules.find((m) => m.numberInList === i);

    if (module) {
      const moduleJobs = jobs.filter((job) => job.moduleId === module.id);

      const tableModule = {
        ...module,
        numberOfJobs: moduleJobs.length,
      };

      orderedModules.push(tableModule);
      orderedJobs.push(...moduleJobs);
    }
  }

  return { orderedJobs, orderedModules };
};
