package com.enirisst.rso_api;

import com.enirisst.rso_api.models.AREA;
import com.enirisst.rso_api.repositories.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@SpringBootApplication
public class RsoApiApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(RsoApiApplication.class, args);



	}


	@Override
	public void run(String... args) throws Exception {

		//TestRepository t = new TestRepository();
	//	List<AREA> areas=t.findAll();
		//areas.forEach(System.out::println);
		/*List<AREA> areas=AREA.template.query("SELECT * FROM AREA", new RowMapper<AREA>() {
			@Override
			public AREA mapRow(ResultSet rs, int rowNum) throws SQLException {

				return new AREA(rs.getString("CODE_ELSTAT"),rs.getString("NAME"),rs.getString("PERIFEREIA"),rs.getDouble("AREA_KM2"));
			}});
		areas.forEach(System.out::println);*/
	}
}
