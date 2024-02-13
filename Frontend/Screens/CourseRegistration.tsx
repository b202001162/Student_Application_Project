import React, {useState} from 'react';
import {Button, TextInput, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CourseRegistration = () => {
  const [studentName, setStudentName] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleCourseSelection = (course: string) => {
    // Add or remove the course based on its current selection state
    const index = selectedCourses.indexOf(course);
    if (index === -1) {
      setSelectedCourses([...selectedCourses, course]);
    } else {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    }
  };

  const handleRegistration = () => {
    // Implement your registration logic here
    console.log('Student Name:', studentName);
    console.log('Selected Courses:', selectedCourses);
    // You can send the registration data to your backend or perform any other necessary action
  };

  
interface Course {
  index: number;
  name: string;
  credits: number;
  selected: boolean;
}

  const [courses, setCourses] = useState<Course[]>([
    { index: 1, name: 'Course A', credits: 3, selected: false },
    { index: 2, name: 'Course B', credits: 4, selected: false },
    { index: 3, name: 'Course C', credits: 3, selected: false },
    { index: 4, name: 'Course D', credits: 4, selected: false },
    { index: 5, name: 'Course E', credits: 3, selected: false },
    { index: 6, name: 'Course F', credits: 4, selected: false },
  ]);

  const toggleSelection = (index: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.index === index ? { ...course, selected: !course.selected } : course
      )
    );
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
          <Text style={styles.heading}>Course Registration</Text>
          <View style={styles.table}>
              <Text style={styles.tableRow}><Text style={styles.cell1}>Semester:</Text>   VI</Text>
              <Text style={styles.tableRow}><Text style={styles.cell1}>Name:</Text>         Karan Padhiyar</Text>
              <Text style={styles.tableRow}><Text style={styles.cell1}>Roll No:</Text>       202001162</Text>
              <Text style={styles.tableRow}><Text style={styles.cell1}>Mobile No:</Text>  92340-13422</Text>
              <Text style={styles.tableRow}><Text style={styles.cell1}>Program:</Text>     Computer Science</Text>
          </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={'#717171'}
          value={studentName}
          onChangeText={(text) => setStudentName(text)}
        />
      </View>

      <View style={styles.container2}>
        <View style={styles.tableRow2}>
          <Text style={styles.columnHeader}>Index</Text>
          <Text style={styles.columnHeader}>Course Name</Text>
          <Text style={styles.columnHeader}>CourseRegistrationedits</Text>
          <Text style={styles.columnHeader}>Selected</Text>
        </View>
        {courses.map((course) => (
          <View key={course.index} style={styles.tableRow2}>
            <Text style={styles.cell}>{course.index}</Text>
            <Text style={styles.cell}>{course.name}</Text>
            <Text style={styles.cell}>{course.CourseRegistrationedits}</Text>
            <TouchableOpacity
              style={[styles.checkbox, { backgroundColor: course.selected ? 'green' : 'transparent' }]}
              onPress={() => toggleSelection(course.index)}
            />
          </View>
        ))}
      </View>

      <Text style={styles.subHeading}>Select Courses:</Text>
      <View style={styles.courseList}>
        <Button
          title="Mathematics"
          onPress={() => handleCourseSelection('Mathematics')}
          color={selectedCourses.includes('Mathematics') ? '#007bff' : '#aaa'}
        />
        <Button
          title="Physics"
          onPress={() => handleCourseSelection('Physics')}
          color={selectedCourses.includes('Physics') ? '#007bff' : '#aaa'}
        />
        <Button
          title="Chemistry"
          onPress={() => handleCourseSelection('Chemistry')}
          color={selectedCourses.includes('Chemistry') ? '#007bff' : '#aaa'}
        />
      </View>

      <Button
        title="Register"
        onPress={handleRegistration}
        disabled={!studentName || selectedCourses.length === 0}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    color: '#000000'
  },
  cell1: {
    fontWeight: 'bold',
    color: '#717171'
  },
  table: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  tableRow: {
    fontSize: 12,
    marginBottom: 5,
    color: '#717171'
  },
  input: {
    height: 40,
    color: '#ffffff',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  subHeading: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    color: '#717171'
  },
  courseList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'space-between',
    marginBottom: 20,
    // width: '100%',
  },
  container2: {
    flex: 1,
    padding: 10,
  },
  tableRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#454545'
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#454545'
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
  },
});

export default CourseRegistration;

