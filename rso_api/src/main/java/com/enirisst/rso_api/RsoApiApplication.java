package com.enirisst.rso_api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
